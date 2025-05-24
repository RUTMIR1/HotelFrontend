import { useEffect, useState } from "react";
import { getAllRooms, getRoomById } from "../services/roomService";
import { Room } from "../model/Room";

export const useRoom = (id:string='')=>{
    const [rooms, setRooms] = useState<Room[]>();
    const [room, setRoom] = useState<Room>();
    const [loadingRooms, setLoadingRooms] = useState<boolean>(true);
    const [errorRooms, setErrorRooms] = useState<string>();

    useEffect(()=>{
        if(id){
            getRoomById(id).then(
                (response)=>{
                    setRoom(response);
                }
            ).catch(err=>{
                setErrorRooms(err.message);
            }).finally(
                ()=>setLoadingRooms(false)
            );
        }else{
            getAllRooms().then(
                (response)=>{
                    setRooms(response);
                }
            ).catch(err=>{
                setErrorRooms(err.message);
            }).finally(
                ()=>setLoadingRooms(false)
            );
        }
    }, [id]);
    return {rooms, errorRooms, loadingRooms, room};
}