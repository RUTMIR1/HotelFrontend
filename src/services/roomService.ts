import requestFetch from "./api";

const path:string = 'Room/';

export const getAllRooms = async ()=>{
    const response = await requestFetch(`${path}`, {
        credentials:'include'
    });
    return response;
}

export const getRoomsByCategory = async (category:string)=>{
    const response = await requestFetch(`${path}category/${category}`,{
        credentials:'include'
    });
    return response;
}