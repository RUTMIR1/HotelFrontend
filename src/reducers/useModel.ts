import { requestModel } from "../services/api";

interface Iaction{
    type: string;
    payload: Record<string, string>;
    endpoint?: string;
}

interface PropsCardReducer{
    state:Record<string, unknown>[];
    action: Iaction;
}

export const modelReducer = async ({state, action}:PropsCardReducer):Promise<Record<string,unknown>[]>=>{
    let newModels:Record<string, unknown>[] = [];
    switch(action.type){
        case 'ADD':
            if(!action.endpoint) return newModels;
            await requestModel(action.endpoint, {
                headers: {'Content-Type':'application/json'},
                method:'POST',
                body:JSON.stringify(action.payload),
                credentials: 'include'
            }).then(
                response =>{
                    console.log(response)
                }
            ).catch(err=>{
                console.log(err);
            })
            break;
        case 'DELETE':
            if(!action.endpoint) return newModels;
            await requestModel(`${action.endpoint}${action.payload.id}`, {
                method: 'DELETE',
                credentials: 'include'
            }).then(
                response =>{
                    console.log(response);
                    newModels = state.filter( el=> el.id !== action.payload.id);
                }
            ).catch(
                response =>{
                    console.error(response);
                }
            )
            break;
        case 'FILTER':
            newModels = state.filter(el =>{
                if(new RegExp(`${action.payload.match}`).test(el[`${action.payload.filter}`] as string)){
                    return true;
                }else if(action.payload.match === ''){
                    return true;
                }
            });
            break;
    }   
    return newModels;
}