import requestFetch from "./api"

const path:string = 'Rol/'
export const getAllRols = async()=>{
    const response = await requestFetch(path,{
        credentials: 'include'
    });
    const rols = await response.json();
    return rols;
}