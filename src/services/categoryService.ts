import requestFetch from "./api";

const path:string = 'Category/';

export const getAllCategories = async ()=>{
    const response = await requestFetch(`${path}`, {
        credentials:'include'
    });
    const categories = await response.json();
    return categories;
}