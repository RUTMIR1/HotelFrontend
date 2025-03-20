import { JSX } from "react";
import { useParams } from "react-router-dom";
import { useRoom } from "../../hooks/room";

function Room():JSX.Element{
    const {id} = useParams();
    const {room} = useRoom(id as string);
    
    return (
        <>  
            <div className="text-center">
                <div className="m-5 text-5xl">{room?.name}</div>
                <div className="m-5 text-2xl">{`Category: ${room?.categories.map((el)=>` ${el.name}`)}`}</div>
                <div>
                    <img className="w-full h-150" src={'/public/room1.jpg'} alt="img room"/> 
                </div>
                <div className="text-lg">
                    {room?.description}
                </div>
                <div className="m-5 text-3xl">
                    <button className="w-9/10" type="button">Reserve</button>
                </div>
            </div>
        </>
    )
}

export default Room;