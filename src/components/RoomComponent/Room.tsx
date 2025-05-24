import { JSX, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRoom } from "../../hooks/room";
import Button from "../buttonComponent/Button";
import { useUserContext } from "../../provider/userProvider";
import { createPay } from "../../services/mercadoPagoService";
import { UseUser } from "../../hooks/user";

function Room():JSX.Element{
    const {userSession} = useUserContext();
    const {id} = useParams();
    const {room, errorRooms, loadingRooms} = useRoom(id as string);
    const {user} = UseUser(userSession?.id);
    const [daysReservation, setDaysReservation] = useState(30);

    const navigate = useNavigate();

    useEffect(()=>{
        console.log(userSession);
    },[userSession]);
    
    const handlerReserve = async ()=>{
        if(user && room){
            const pay = await createPay({
                days:daysReservation,
                user_id:user.id,
                room_id:room.id,
                success_url:'http:localhost:5173/'
            });
            window.open(pay.init_point, '_blank');
        }
    }
    return (
        <> 
            {
                errorRooms || loadingRooms && <h2 className="text-2xl">Loading Room</h2> || room &&
                <div className="text-center">
                    <div className="m-5 text-5xl">{room.name}</div>
                    <div className="m-5 text-2xl">{`Category: ${room.categories.map((el)=>` ${el.name}`)}`}</div>
                    <div>
                        <img className="w-full h-150" src={'/public/room1.jpg'} alt="img room"/> 
                    </div>
                    <div className="text-lg">
                        {room.description}
                    </div>
                    <div className="mt-5 text-3xl">
                        <label htmlFor="days">Days: </label>
                        <input onChange={(e)=>setDaysReservation(parseFloat(e.target.value))} className="outline focus:outline-sky-300"
                        name="days" id="days" type="number" defaultValue={30} />
                    </div>
                    <div className="mt-5 text-3xl">
                        <label htmlFor="price">Price: </label>
                        <input className="outline focus:outline-sky-300"
                        name="price" id="price" type="number" value={room.price * daysReservation} disabled/>
                    </div>
                    <div className="mt-5 text-3xl">
                        {
                            userSession?<Button onClick={handlerReserve}>Reserve</Button>:<Button
                            onClick={()=>navigate(`/login?back=rooms.room.${id}`)}>Login for reserve</Button>
                        }
                    </div>
                </div>
            } 
        </>
    )
}

export default Room;