import { JSX } from "react";


interface ITableProps{
    model:object;
    list:object[];
}
function Table({model, list}:ITableProps):JSX.Element{
    console.log(model)
    console.log(list)

    const headers:string[] = Object.keys(model);
    const headersValues:unknown[] = Object.values(model);
    const body:object[] =[];
    for(const el of list){
        body.push(el);
    }

    const createHeaders =  (model, numKeys)=>{
        
    }

    return (
        <>
            {
                list && (<table className="mt-5 outline">
                <thead>
                    <tr>
                        {
                          headers.map((el, index)=>{
                              if(typeof headersValues[index] !== 'object'){
                                  return <th className="outline" scope="col">{el}</th>
                                }else{
                                   if(headersValues[index]){
                                       return <th className="outline" colSpan={Object.keys(headersValues[index]).length} scope="col">{el}</th>
                                   }
                             }
                          })
                        }
                    </tr>
                    <tr>
                        {
                            headers.map((el, index)=>{
                                if(typeof headersValues[index] !== 'object'){
                                    return <th scope="col"></th>
                                  }else{
                                    Array.from(headersValues[index]).map(el=>{
                                        if(headersValues[index]){
                                            return <th className="outline" colSpan={Object.keys(headersValues[index]).length} scope="col">{el}</th>
                                        }
                                    })
                                }
                            })
                        }
                    </tr>
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
            )}
        </>
    )
}

export default Table