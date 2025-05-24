import { useEffect, useRef, useState } from "react";
import { deleteUser, getAllUsers } from "../services/userService";
import { User } from "../model/User";

export const UseFilterUser = ()=>{
    const [list, setList] = useState<User[]>([]);
    const [currentList, setCurrentList] = useState<User[]>([]);

    const username = useRef('');
    const email = useRef('');
    const dni = useRef('');
    const rol = useRef('');
    const country = useRef('');

    const handlerFilters = async (e:React.ChangeEvent<HTMLSelectElement| HTMLInputElement>)=>{
        const {name, value}= e.target;
        switch(name){
            case 'username':
                username.current = value;
                break;
            case 'email':
                email.current = value;
                break;
            case 'dni':
                dni.current = value;
                break;
            case 'rol':
                rol.current = value;
                break;
            case 'country':
                country.current = value;
                break;
        }
        let newList = [...list];
        if(username.current !== '') newList = newList.filter(el=> new RegExp(`^${username.current.toLowerCase()}`).test(el.username.toLowerCase()));
        if(email.current !== '') newList = newList.filter(el=>new RegExp(`^${email.current.toLowerCase()}`).test(el.email.toLowerCase()));
        if(dni.current !== '') newList = newList.filter(el=>new RegExp(`^${dni.current}`).test(el.dni));
        if(rol.current !== '') newList = newList.filter(el=>el.rol.name === rol.current);
        if(country.current !== '') newList = newList.filter(el=>new RegExp(`^${country.current.toLowerCase()}`).test(el.address.country.toLowerCase()));
        setCurrentList(newList);
    }

    useEffect(()=>{
        getAllUsers().then(
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

    const onDelete = ({id}:{id:string})=>{
        deleteUser(id).then(
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