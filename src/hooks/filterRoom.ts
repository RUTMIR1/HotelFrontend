import { useEffect, useState } from "react";
import { RoomType } from "../schemas/Room";
import { getAllRooms, getRoomsByCategory } from "../services/roomService";
import { CategoryType } from "../schemas/Category";
import { getAllCategories } from "../services/categoryService";

export function UseFilterRoom(){
   const [rooms, setRooms] = useState<RoomType[] | []>([]);
   const [categories, setCategories] = useState<CategoryType[] | []>([]);
   const [categorySelected , setCategorySelected] = useState<string>('');
   useEffect(()=>{
       getAllRooms().then(
        (response)=>{
            setRooms(response);
        }
       )
       getAllCategories().then(
        (response)=>{
            setCategories(response);
        }
       )
   }, [])

   useEffect(()=>{
    if(categorySelected !== ''){
        getRoomsByCategory(categorySelected).then((response)=>{
            setRooms(response);
        });
    }
   }, [categorySelected]);

   const handlerCategoryList = (e:React.ChangeEvent<HTMLSelectElement>):void=>{
        setCategorySelected(e.target.value);
   }
   
   return {rooms, categories, handlerCategoryList};
}