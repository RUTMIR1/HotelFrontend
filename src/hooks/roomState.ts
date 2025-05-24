import { useEffect, useState } from "react"
import { getAllRoomsByState } from "../services/roomService";
import { Room } from "../model/Room";

export const useRoomState = (state:string)=>{
    const [roomsState, setRoomState] = useState<Room[]>();
    const [errorState, setErrorRoomState] = useState<string>();
    const [loadingRoomState, setLoadingRoomState] = useState<boolean>(true);

    useEffect(()=>{
        getAllRoomsByState(state).then(
            (response)=>{
                setRoomState(response);
            }
        ).catch(
            (error)=>{
                setErrorRoomState(error.mesasge);
            }
        ).finally(
            ()=>setLoadingRoomState(false)
        )
    },[state])

    return {roomsState, errorState, loadingRoomState}
}