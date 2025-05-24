import { useEffect, useRef, useState } from "react";
import { Reservation } from "../model/Reservation";
import { deleteReservation, getAllReservations } from "../services/reservationService";

export const UseFilterReservation = ()=>{
    const [list, setList] = useState<Reservation[]>([]);
    const [currentList, setCurrentList] = useState<Reservation[]>([]);
    const code = useRef('');
    const state = useRef('');
    const fromReservationStart =useRef('');
    const toReservationStart = useRef('');
    const fromReservationEnd = useRef('');
    const toReservationEnd = useRef('');
    const amountMin = useRef(0);
    const amountMax = useRef(0);
    const username = useRef('');
    const room = useRef('');

    const handlerFilters = async (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        const {name, value} = e.target;
        switch(name){
            case 'code':
                code.current = value;
                break;
            case 'state':
                state.current = value;
                break;
            case 'from-reservation-start':
                fromReservationStart.current = value;
                break;
            case 'to-reservation-start':
                toReservationStart.current = value;
                break;
            case 'from-reservation-end':
                fromReservationEnd.current = value;
                break;
            case 'to-reservation-end':
                toReservationEnd.current = value;
                break;
            case 'amount-min':
                amountMin.current = value !== '' && !Number.isNaN(value) ? parseFloat(value) :0;
                break;
            case 'amount-max':
                amountMax.current = value !== '' && !Number.isNaN(value) ? parseFloat(value) :0;
                break;
            case 'username':
                username.current = value;
                break;
            case 'room':
                room.current = value;
                break;
        }
        let newList = [...list];
        if(code.current !== '') newList = newList.filter(el=>new RegExp(`^${code.current.toLowerCase()}`).test(el.code.toLowerCase()));
        if(state.current !== '') newList = newList.filter(el=>new RegExp(`^${state.current.toLocaleLowerCase()}`).test(el.state.toLowerCase()));
        if(fromReservationStart.current !== '' && toReservationStart.current !== '') newList = newList.filter(el=>
            new Date(el.reservation_date_start).getTime() >=new Date(fromReservationStart.current).getTime() &&
        new Date(el.reservation_date_start).getTime() <= new Date(toReservationStart.current).getTime());
        if(fromReservationStart.current !== '' && toReservationStart.current === '') newList = newList.filter(el=>
            new Date(el.reservation_date_start).getTime() >= new Date(fromReservationStart.current).getTime());
        if(fromReservationStart.current === '' && toReservationStart.current !== '') newList = newList.filter(el=>
            new Date(el.reservation_date_start).getTime() <= new Date(toReservationStart.current).getTime());
        
        if(fromReservationEnd.current !== '' && toReservationEnd.current !== '') newList = newList.filter(el=>
            new Date(el.reservation_date_end).getTime() >=new Date(fromReservationEnd.current).getTime() &&
        new Date(el.reservation_date_end).getTime() <= new Date(toReservationEnd.current).getTime());
        if(fromReservationEnd.current !== '' && toReservationEnd.current === '') newList = newList.filter(el=>
            new Date(el.reservation_date_end).getTime() >= new Date(fromReservationEnd.current).getTime());
        if(fromReservationEnd.current === '' && toReservationEnd.current !== '') newList = newList.filter(el=>
            new Date(el.reservation_date_end).getTime() <= new Date(toReservationEnd.current).getTime());
        if(amountMin.current !== 0 && amountMax.current !== 0) newList = newList.filter(el=>el.amount >= amountMin.current && el.amount <= amountMax.current);
        if(amountMin.current !== 0 && amountMax.current === 0) newList = newList.filter(el=>el.amount >= amountMin.current);
        if(amountMin.current === 0 && amountMax.current !== 0) newList = newList.filter(el=>el.amount <= amountMax.current);
        if(username.current !== '') newList = newList.filter(el=> new RegExp(`^${username.current.toLowerCase()}`).test(el.user.username.toLowerCase()));
        if(room.current !== '') newList = newList.filter(el=> new RegExp(`^${room.current.toLowerCase()}`).test(el.room.name.toLowerCase()));
        
        setCurrentList(newList);
    }

    useEffect(()=>{
        getAllReservations().then(
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

    const onDelete =({id}:{id:string})=>{
        deleteReservation(id).then(
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