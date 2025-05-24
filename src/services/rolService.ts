import { Rol } from "../model/Rol";
import requestFetch from "./api"

const path:string = 'Rol/'
export const getAllRols = async()=>{
    const response = await requestFetch(path,{
        credentials: 'include'
    });
    const rols = await response.json();
    return rols;
}

export const createRol = async(rol:Rol)=>{
    const response = await requestFetch(path,{
        headers:{'Content-type':'application/json'},
        method: 'POST',
        body: JSON.stringify(rol),
        credentials: 'include'
    })
    const message = await response.json();
    return message;
}

export const updateRol = async(id:string, rol:Partial<Rol>)=>{
    const response = await requestFetch(`${path}${id}`,{
        headers:{'Content-type':'application/json'},
        method:'PATCH',
        body: JSON.stringify(rol),
        credentials: 'include'       
    })
    const message = await response.json();
    return message;
}

export const deleteRol = async (id:string)=>{
    const response = await requestFetch(`${path}${id}`,{
        method:'DELETE',
        credentials:'include'
    });
    const deletedRol = response.json();
    return deletedRol;
}