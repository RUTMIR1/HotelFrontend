import { useEffect, useRef, useState } from "react";
import { Category } from "../model/Category";
import { deleteCategory, getAllCategories } from "../services/categoryService";

export const UseFilterCategory = ()=>{
    const [list, setList] = useState<Category[]>([]);
    const [currentList, setCurrentList] = useState<Category[]>([]);

    const nameCategory = useRef('');
    useEffect(()=>{
        getAllCategories().then(
            (response)=>{
                setList(response);
                setCurrentList(response);
            }
        ).catch(
            (err)=>{
                console.log(err);
            }
        )
    },[]);

    const handlerFilters = async (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        const {name, value} = e.target;
        switch(name){
            case 'name':
                nameCategory.current = value;
                break;
        }
        let newList = [...list];
        if(nameCategory.current !== '') newList = newList.filter(el=>new RegExp(`^${nameCategory.current.toLowerCase()}`).test(el.name.toLowerCase()));
        setCurrentList(newList);
    }

    const onDelete = async ({id}:{id:string})=>{
        deleteCategory(id).then(
            response=>{
                if(response.status >= 200 && response.status <= 299){
                    const newList = list.filter(el=>el.id !== id);
                    const newCurrentList = currentList.filter(el=>el.id !== id);
                    setList(newList);
                    setCurrentList(newCurrentList);
                }
            }
        )
    }
    return {list, currentList, onDelete, handlerFilters};
}