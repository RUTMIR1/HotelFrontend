import { JSX } from "react"; 
import { UseTable } from "../../hooks/table";
import { Model } from "../../model/Model";

interface ITableProps{
    model:object;
    list:Model[];
    title?:string;
    onDelete?:({id}:{id:string})=>void;
    onUpdate?:({id, data}:{id:string, data:object})=>void;
    onAdd?:()=>void;
}
function Table({model, list, title='Model', onDelete, onUpdate, onAdd}:ITableProps):JSX.Element{
    const {headers, getAllNodesLvl, getLvlMaxTree, body} = UseTable(model, title, list);

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
                 body && body.map((el, index)=>
                    <tr className="w-full">
                    <td className="bg-stone-400 outline p-2">
                        <button className="w-full h-10 rounded-md border bg-red-500 hover:cursor-pointer hover:bg-red-950" type="button" onClick={()=>{if(onDelete) onDelete({id:list[index].id as string})}}>Delete</button>
                        <button className="w-full h-10 rounded-md border mt-2 bg-amber-500 hover:cursor-pointer hover:bg-amber-800" type="button" onClick={()=>{if(onUpdate) onUpdate({id:list[index].id as string, data:list[index]})}}>Update</button>
                    </td>
                    {
                        el.map(data=>
                            <td className="bg-stone-400 outline p-2">{data}</td>)
                    }
                    </tr>)
                }
                </tbody>
            </table>
        </div>
        </>
    )
}

export default Table