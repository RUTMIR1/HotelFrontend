import { JSX } from "react"; 
import { UseTable } from "../../hooks/table";

interface ITableProps{
    model:object;
    list:Record<string, string | number | object>[];
    title?:string;
    onDelete?:({id}:{id:string})=>void;
    onUpdate?:({id, data}:{id:string, data:object})=>void;
    onAdd?:()=>void;
}
function Table({model, list, title='Model', onDelete, onUpdate, onAdd}:ITableProps):JSX.Element{
    const {headers, getAllNodesLvl, getLvlMaxTree} = UseTable(model, title);
    const body:Record<string, string | number | object>[] =[];
    for(const el of list){
        body.push(el);
    }
    return (
        <>
        <button className="mt-5 w-full h-10 rounded-md border bg-green-400 hover:cursor-pointer hover:bg-green-800" type="button"
            onClick={onAdd}>Add</button>
        <h2 className="text-center text-2xl outline bg-stone-600">{title}</h2>
        <div className="overflow-x-auto outline">
            <table className="outline text-center text-black">
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
                                    <td className="bg-stone-400 outline p-2">
                                        <button className="w-full h-10 rounded-md border bg-red-500 hover:cursor-pointer hover:bg-red-950" type="button" onClick={()=>{if(onDelete && el.id) onDelete({id:el.id as string})}}>Delete</button>
                                        <button className="w-full h-10 rounded-md border mt-2 bg-amber-500 hover:cursor-pointer hover:bg-amber-800" type="button" onClick={()=>{if(onUpdate && el.id) onUpdate({id:el.id as string, data:el})}}>Update</button>
                                    </td>
                                    {
                                        Object.values(el).map((value)=>{
                                            if(typeof value !== 'object'){
                                                return <td className="bg-stone-400 outline p-2">{value}</td>
                                            }else{
                                                return Object.values(value).map(value=>{
                                                    return <td className="bg-stone-400 outline p-2">{value as string}</td>
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