import { Reservation } from "../model/Reservation";
import requestFetch from "./api";

const path = 'Reservation/';

export const getAllReservations = async ()=>{
    const response = await requestFetch(path,{
        credentials:'include'
    });
    const reservations = await response.json();
    return reservations;
}

export const createReservation = async (reservation:Reservation)=>{
    const response = await requestFetch(path,{
        method:'POST',
        credentials:'include',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(reservation)
    });
    const newReservation = await response.json();
    return newReservation;
}

export const updateReservation = async (id:string, reservation:Partial<Reservation>)=>{
    const response = await requestFetch(`${path}${id}`,{
        method:'PATCH',
        headers: {'Content-Type':'application/json'},
        credentials:'include',
        body:JSON.stringify(reservation)
    });
    const updatedReservation = await response.json();
    return updatedReservation;
}

export const deleteReservation = async(id:string)=>{
    const response = await requestFetch(`${path}${id}`,{
        method:'DELETE',
        credentials:'include'
    });
    const deletedReservation = await response.json();
    return deletedReservation;
}