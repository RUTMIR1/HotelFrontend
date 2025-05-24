import { Room } from "../model/Room";
import requestFetch from "./api";

const path:string = 'Room/';

export const getAllRooms = async ()=>{
    const response = await requestFetch(`${path}`, {
        credentials:'include'
    });
    const rooms = await response.json();
    return rooms;
}

export const getAllRoomsByState = async (state:string)=>{
    const response = await requestFetch(`${path}state/${state}`,{
        credentials:'include'
    })
    const rooms = await response.json();
    return rooms;
}

export const getRoomById = async (id:string)=>{
    const response = await requestFetch(`${path}${id}`,{
        credentials: 'include'
    })
    const room = await response.json();
    return room;
}

export const getRoomsByCategory = async (category:string)=>{
    const response = await requestFetch(`${path}category/${category}`,{
        credentials:'include'
    });
    const rooms = await response.json();
    return rooms;
}

export const createRoom = async (room:Room)=>{
    const response = await requestFetch(`${path}`, {
        method: 'POST',
        credentials: 'include',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(room)
    });
    const newRoom = await response.json();
    return newRoom;
}

export const updateRoom = async (id:string, room:Partial<Room>)=>{
    const response = await requestFetch(`${path}${id}`,{
        method: 'PATCH',
        credentials: 'include',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(room)
    })
    const updatedRoom = await response.json();
    return updatedRoom;
}

export const deleteRoom = async (id:string)=>{
    const response = await requestFetch(`${path}${id}`,{
        method:'DELETE',
        credentials:'include'
    })
    const deletedRoom = response.json();
    return deletedRoom;
}