import { JSX, useEffect } from "react"; 
import { UseTable } from "../../hooks/table";

interface ITableProps{
    model:object;
    list:object[];
    title?:string;
}
function Table({model, list, title='Model'}:ITableProps):JSX.Element{
    const {headers, getAllNodesLvl, getLvlMaxTree} = UseTable(model, title);

    useEffect(()=>{
        
    }, [headers, list])
    //const header1:string[] = Object.keys(model);
    //const headersValues:unknown[] = Object.values(model);
    const body:object[] =[];
    for(const el of list){
        body.push(el);
    }
    return (
        <>
            <table>
                <caption className="outline text-4xl">{title}</caption>
                <thead>
                    {
                        headers &&
                        [...Array(getLvlMaxTree([headers]))].map((_, i) => (
                            (i !== 0)&&
                                <tr>
                                    {
                                        getAllNodesLvl([headers], i).map((el)=>(
                                            <th className="outline" colSpan={el.colSpan}>{el.value}</th>
                                        ))
                                    }
                                </tr>
                        ))
                    }
                </thead>
                <tbody>
                {
                        body.map(el=>{
                            return (
                                <tr>
                                    {
                                        Object.values(el).map(value=>{
                                            if(typeof value !== 'object'){
                                                return <td className="outline">{value}</td>
                                            }else{
                                                return Object.values(value).map(value=>{
                                                    return <td className="outline">{value as string}</td>
                                                })
                                            }
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default Table