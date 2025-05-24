import { useEffect, useRef, useState } from "react";
import { Rol } from "../model/Rol";
import { deleteRol, getAllRols } from "../services/rolService";

export const UseFilterRol = ()=>{
    const [list, setList] = useState<Rol[]>([]);
    const [currentList, setCurrentList] = useState<Rol[]>([]);
    const nameRol = useRef('');

    useEffect(()=>{
        getAllRols().then(
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
                nameRol.current = value;
                break;
        }
        let newList = [...list];
        if(nameRol.current !== '')newList = newList.filter(el=>new RegExp(`^${nameRol.current}`).test(el.name));
        setCurrentList(newList);
    }

    const onDelete = async ({id}:{id:string})=>{
        deleteRol(id).then(
            response=>{
                if(response.status >= 200 && response.status <= 299){
                    const newList = list.filter(el=>el.id !== id);
                    const newCurrentList = list.filter(el=>el.id !== id);
                    setList(newList);
                    setCurrentList(newCurrentList);
                }
            }
        )
    }

    return { list, currentList, onDelete, handlerFilters};
}