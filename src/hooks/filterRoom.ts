import { useEffect, useRef, useState } from "react";
import { deleteRoom, getAllRooms, getAllRoomsByState } from "../services/roomService";
import { Room } from "../model/Room";

export function UseFilterRoom(stateRoom:string=''){
   const [list, setList] = useState<Room[]>([]);
   const [currentList, setCurrentList] = useState<Room[]>([]);

    const category = useRef('');
    const state = useRef('');
    const nameRoom = useRef('');
    const priceMin = useRef(0);
    const priceMax = useRef(0);

    const handlerFilters = async (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        const {name, value} = e.target;
        switch(name){
            case 'category':
                category.current = value;                    
                break;
            case 'state':
                state.current = value;
                break;
            case 'name':
                nameRoom.current = value;
                break;
            case 'price-min':
                priceMin.current = value !== '' && !Number.isNaN(value)? parseFloat(value):0;
                break;
            case 'price-max':
                priceMax.current = value !== '' && !Number.isNaN(value)? parseFloat(value):0;
                break;
        }
        let newList = [...list];
        if(nameRoom.current !== '') newList = newList.filter(el=>new RegExp(`^${nameRoom.current.toLowerCase()}`).test(el.name.toLowerCase()));
        if(state.current !== '')newList = newList.filter(el=>state.current === el.state);
        if(category.current !== '') newList = newList.filter((el)=>el.categories.some(el=>el.name === category.current));
        if(priceMin.current !== 0 && priceMax.current !== 0) newList = newList.filter(el=>el.price >= priceMin.current &&
            el.price <= priceMax.current);
        if(priceMin.current !== 0 && priceMax.current === 0) newList = newList.filter(el=>el.price >= priceMin.current);
        if(priceMin.current === 0 && priceMax.current !== 0) newList = newList.filter(el=>el.price <= priceMax.current);
        setCurrentList(newList);
    }

    const onDelete = ({id}:{id:string})=>{
            deleteRoom(id).then(
                response=>{
                    if(response.status >= 200 && response.status <= 200){
                        const newList = list.filter(el=>el.id !== id);
                        const newListCurrent = currentList.filter(el=>el.id !== id);
                        setList(newList);
                        setCurrentList(newListCurrent);
                    }
                }
            )
    }

    useEffect(()=>{
        if(stateRoom===''){
            getAllRooms().then(
                response=>{
                    setList(response);
                    setCurrentList(response);
                }
            ).catch(
                error=>{
                    console.log(error);
                }
            )
        }else{
            getAllRoomsByState(stateRoom).then(
                response=>{
                    setList(response);
                    setCurrentList(response);
                }
            ).catch(
                error=>{
                    console.log(error);
                }
            )
        }
    },[stateRoom]);

    return {list, currentList, onDelete, handlerFilters};
}