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
    const body:object[] =[];
    for(const el of list){
        body.push(el);
    }
    return (
        <>
        <h2 className="text-center text-2xl outline bg-stone-600">{title}</h2>
        <div className="overflow-x-auto outline">
            <table className="outline text-center">
                <thead>
                    {
                        headers &&
                        [...Array(getLvlMaxTree([headers]))].map((_, i) => (
                            (i !== 0)&&
                                <tr key={i}>
                                    {
                                        getAllNodesLvl([headers], i).map((el)=>(
                                            <th className="bg-stone-500 p-5 outline" colSpan={el.colSpan}>{el.value}</th>
                                        ))
                                    }
                                </tr>
                        ))
                    }
                </thead>
                <tbody className="w-full">
                {
                        body.map((el)=>{
                            return (
                                <tr className="w-full">
                                    {
                                        Object.values(el).map((value)=>{
                                            if(typeof value !== 'object'){
                                                return <td className="bg-stone-400 outline">{value}</td>
                                            }else{
                                                return Object.values(value).map(value=>{
                                                    return <td className="bg-stone-400 outline">{value as string}</td>
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
        </div>
        </>
    )
}

export default Table