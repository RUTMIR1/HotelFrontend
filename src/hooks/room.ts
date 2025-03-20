import { useEffect, useState } from "react";
import { RoomType } from "../schemas/Room";
import { getRoomById } from "../services/roomService";

export const useRoom = (id:string)=>{
    const [room, setRoom] = useState<RoomType | null>(null);

    useEffect(()=>{
        if(id){
            getRoomById(id).then(
                (response)=>{
                    console.log("se consiguio")
                    setRoom(response);
                }
            );
        }
    }, [id]);
    return {room};
}