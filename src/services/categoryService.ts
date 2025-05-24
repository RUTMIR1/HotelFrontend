import { Category } from "../model/Category";
import requestFetch from "./api";

const path:string = 'category/';

export const getAllCategories = async ()=>{
    const response = await requestFetch(`${path}`, {
        credentials:'include'
    });
    const categories = await response.json();
    return categories;
}

export const createCategory = async (category:Category)=>{
    const response = await requestFetch(`${path}`,{
        headers: {'Content-type':'application/json'},
        method: 'POST',
        body:JSON.stringify(category),
        credentials:'include'
    })
    const message = response.json();
    return message;
}

export const updateCategory = async (id:string, category:Category)=>{
    const response = await requestFetch(`${path}${id}`,{
        headers:{'Content-type':'application/json'},
        method:'PATCH',
        body: JSON.stringify(category),
        credentials:'include'
    })
    const message = response.json();
    return message; 
}

export const deleteCategory = async (id:string)=>{
    const response = await requestFetch(`${path}${id}`,{
        method:'DELETE',
        credentials:'include'
    });
    const deleteCategory = response.json();
    return deleteCategory;
}