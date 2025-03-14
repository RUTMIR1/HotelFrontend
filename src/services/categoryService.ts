import requestFetch from "./api";

const path:string = 'Category/';

export const getAllCategories = async ()=>{
    const response = await requestFetch(`${path}`, {
        credentials:'include'
    });
    return response;
}