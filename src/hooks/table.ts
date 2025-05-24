import { useState, useEffect } from "react";
import { TableTree } from "../types/utilTypes";
import { Model } from "../model/Model";

//Record<string, string | number | object>[]
export const UseTable = (model:object, title:string='Model', list:Model[])=>{

    const [headers, setHeaders] = useState<TableTree>();
    const [body, setBody] = useState<string[][]>([]);
    //const [lvlModel, setLvlModel] = useState<number>();

    useEffect(()=>{

        const createBody = (list: Model[]) => {
            const result: string[][] = [];
        
            list.forEach((el) => {
                const currentRow: string[] = [];
                getRowsTable(Object.values(el), currentRow);
                result.push(currentRow);
            });
        
            setBody(result);
        };
        
        const getRowsTable = (values: (string | number | object)[], row: string[]) => {
            values.forEach((node) => {
                if (typeof node === 'object' && node !== null) {
                    if (Array.isArray(node)) {
                        if (node.length > 0 && typeof node[0] === 'object') {
                            const grouped: Record<string, string[]> = {};
                            node.forEach(item => {
                                if (typeof item === 'object' && item !== null) {
                                    Object.entries(item).forEach(([key, value]) => {
                                        if (!grouped[key]) grouped[key] = [];
                                        if (Array.isArray(value)) {
                                            const nested: string[][] = [];
                                            value.forEach(nestedItem => {
                                                const nestedRow: string[] = [];
                                                getRowsTable([nestedItem], nestedRow);
                                                nestedRow.forEach((val, i) => {
                                                    if (!nested[i]) nested[i] = [];
                                                    nested[i].push(val);
                                                });
                                            });
        
                                            nested.forEach((arr, i) => {
                                                const keyNested = `${key}-${i}`;
                                                grouped[keyNested] = arr;
                                            });
        
                                        } else if (typeof value === 'object' && value !== null) {
                                            const temp: string[] = [];
                                            getRowsTable([value], temp);
                                            grouped[key].push(...temp);
                                        } else {
                                            grouped[key].push(String(value));
                                        }
                                    });
                                }
                            });
                            Object.values(grouped).forEach(valArray => {
                                row.push(valArray.join(' - '));
                            });
        
                        } else {
                            row.push(node.map(el => String(el)).join(' - '));
                        }
                    } else {
                        getRowsTable(Object.values(node), row);
                    }
                } else {
                    row.push(String(node));
                }
            });
        };
        /* const createBody = (list:Record<string, string | number | object>[])=>{
            list.forEach((el)=>{
                getRowsTable(Object.values(el) as Record<string, string | number | object>[]);
                setBody(prev=>[...prev, currentBody.current]);
                currentBody.current = [];
            });
        }

        const getRowsTable = (values:Record<string, string | number | object>[])=>{
            return values.map((node)=>{
                if(typeof node === 'object' && node !== null){
                    if(Array.isArray(node)){
                        getMultipleValues(node as Record<string, string | number | object>[]);
                    }else{
                        getRowsTable(Object.values(node) as Record<string, string | number | object>[]);
                    }
                }else{
                    currentBody.current.push(node);
                }
            })
        }

        const getMultipleValues = (values:Record<string, string | number | object>[])=>{
            Object.keys(values[0]).forEach((key, index)=>{
                if(typeof values[0][key] === 'object' && values[0][key] !== null){
                    if(Array.isArray(values[0][key])){
                        return getMultipleValues(Object.values(values[0][key]) as Record<string, string | number | object>[]);
                    }else{
                        return getRowsTable(Object.values(values[index][key]) as Record<string, string | number | object>[]);
                    }
                }else{
                    currentBody.current.push(values.map(node=>node[key] as string).join(', ')); 
                }
            })
        } */
       
        const createHeaders = (model:Record<string, unknown>, name:string, first:boolean=true):TableTree=>{
            let origin:TableTree;
            if(first){
                origin = {
                    typeNode: 'tr',
                    value: name,
                    colSpan: 1,
                    children: [{
                        typeNode: 'th',
                        value: 'Actions',
                        colSpan: 1,
                        children: []
                    }]
                }
            }else{
                origin = {
                    typeNode: 'tr',
                    value: name,
                    colSpan: 0,
                    children: []
                }
            }
            for(const key in model){
                if(typeof model[key] === 'object' && model[key] !== null){
                    if(!Array.isArray(model[key])){
                        const tr:TableTree = createHeaders(model[key] as Record<string, unknown>, key, false);
                        origin.children.push(tr);
                        origin.colSpan += tr.children.length;
                    }else{
                        const tr:TableTree = createHeaders(model[key][0] as Record<string, unknown>, key, false);
                        origin.children.push(tr);
                        origin.colSpan += tr.children.length;
                    }
                    
                }else{
                    const th = {
                        typeNode: 'th',
                        value: key,
                        colSpan: 1,
                        children: []
                    }
                    origin.children.push(th)
                    origin.colSpan +=1;
                }
            }
            return origin;
        }
        setHeaders(createHeaders(model as Record<string,unknown>, title));
        createBody(list);
    }, [model, title, list])

    const getLvlMaxTree = (tree:TableTree[], currenteLevel:number=0):number =>{
        if(tree.length === 0){
            return currenteLevel;
        }
        const nodes:TableTree[] = [];
        for(const node of tree){
            for(const child of node.children){
                nodes.push(child);
            }
        }
        return getLvlMaxTree(nodes, currenteLevel+1);
    }        

    const getAllNodesLvl = (tree:TableTree[], lvl:number, currenteLevel = 0):TableTree[]=>{
            if(lvl === currenteLevel){
                return tree;
            }
    
            const nodes:TableTree = {
                typeNode: 'model',
                value: '',
                colSpan: 0,
                children: []
            };
    
            for(const node of tree){
                if(node.children.length === 0){
                    nodes.children.push({
                        typeNode:'th',
                        value: '',
                        colSpan: 1,
                        children: []
                    });
                }
                for(const child of node.children){
                    nodes.children.push(child);
                }
            }
            return getAllNodesLvl([...nodes.children], lvl, currenteLevel+1);
        }


    return {headers, getAllNodesLvl, getLvlMaxTree, body};
}