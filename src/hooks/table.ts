import { useState, useEffect } from "react";
import { TableTree } from "../types/utilTypes";

export const UseTable = (model:object, title:string='Model')=>{

    const [headers, setHeaders] = useState<TableTree>();
    //const [lvlModel, setLvlModel] = useState<number>();

    useEffect(()=>{
        const createHeaders = (model:Record<string, unknown>, name:string):TableTree=>{
            const origin:TableTree = {
                typeNode: 'tr',
                value: name,
                colSpan: 0,
                children: []
            }
            for(const key in model){
                if(typeof model[key] === 'object' && model[key] !== null){
                    const tr:TableTree = createHeaders(model[key] as Record<string, unknown>, key);
                    origin.children.push(tr);
                    origin.colSpan += tr.children.length;
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
        
    }, [model, title])

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

    return {headers, getAllNodesLvl, getLvlMaxTree};
}