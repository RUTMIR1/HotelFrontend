import requestFetch from "./api";

const path:string = 'Room/';

export const getAllRooms = async ()=>{
    const response = await requestFetch(`${path}`, {
        credentials:'include'
    });
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