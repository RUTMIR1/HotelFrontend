import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "../../hooks/formHook";
import Button from "../buttonComponent/Button";
import { JSX, useEffect, useState } from "react";
import { Model } from "../../model/Model";
import { Reservation, statesReservation } from "../../model/Reservation";
import { createReservation, updateReservation } from "../../services/reservationService";
import { UseUser } from "../../hooks/user";
import { useRoomState } from "../../hooks/roomState";
import { statesRoom } from "../../model/Room";

function ReserveForm():JSX.Element{
    const {errorsInput, handlerForm} = useForm();
    const [searchParams] = useSearchParams();
    const actionType = searchParams.get('action') || '';
    const location = useLocation();
    const dataState = location.state;
    const [currentReservation, setCurrentReservation] = useState<Reservation>();
    const {users, errorUsers, loadingUsers} = UseUser();
    const {roomsState, errorState, loadingRoomState} = useRoomState(statesRoom[0]);

    useEffect(()=>{
        if(actionType === 'Update'){
            setCurrentReservation(dataState.data);
        }else{
            const emptyReservation = Reservation.empty();
            emptyReservation.state = statesReservation[0];
            emptyReservation.code = 'CODE00000';
            setCurrentReservation(emptyReservation);
        }
    },[actionType, dataState])

    const navigate = useNavigate();

    const action = async (data:Model)=>{
        if(actionType === 'Create'){
            try{
                const result = await createReservation(currentReservation as Reservation);
                return result;
            }catch(err){
                return err;
            }
        }else{
            try{
                const result = await updateReservation(dataState.id, data as Reservation);
                return result;
            }catch(err){
                return err;
            }
        }
    }

    const actionEnd = async ()=>{
        navigate(`/profile/manage/reservation?type=user`)
    }

    const handlerStartReservation = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        const {value} = e.target;
        if(currentReservation){
            setCurrentReservation({
                ...currentReservation,
                reservation_date_start: value,
                check_in: value,
                reservation_date_end: new Date(new Date(value).getTime() + (1000*60*60*24*currentReservation.days)).toISOString().split('T')[0],
                check_out: new Date(new Date(value).getTime() + (1000*60*60*24*currentReservation.days)).toISOString().split('T')[0]
            })
        }
    }
    const handlerDays = (e:React.ChangeEvent<HTMLInputElement |HTMLSelectElement>)=>{
        const {name, value} = e.target;
        if(currentReservation && value !== '' && !Number.isNaN(value)){
            const parsedValue = parseFloat(value);
            setCurrentReservation({
                ...currentReservation,
                [name]: parsedValue,
                amount: parsedValue * currentReservation.room.price,
                reservation_date_end: new Date(new Date(currentReservation.reservation_date_start).getTime()
                + (1000*60*60*24*parsedValue)).toISOString().split('T')[0],
                check_out:new Date(new Date(currentReservation.check_in).getTime()
                + (1000*60*60*24*parsedValue)).toISOString().split('T')[0]
            });
        }
    }

    const handlerStates = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        const {value} = e.target;
        if(currentReservation){
            setCurrentReservation({
                ...currentReservation,
                state: value,
            })
        }
    }

    useEffect(()=>{
        console.log(currentReservation)
    }, [currentReservation])

    return (
        <>
            <div className="w-full flex justify-center items-center text-black">
            <div className="mt-5 w-full max-w-2xl">
                <form onSubmit={(e)=>handlerForm({e,currentModel:currentReservation as Model,action, actionEnd})} className="rounded p-5 form-style">
                {currentReservation && (<><h2 className="text-center text-4xl bg-sky-600 outline">Reserve</h2>
                    <div className="flex flex-col mt-5">
                        <label className="text-xl" htmlFor="reservation_date_start">Reservation Date Start</label>
                        <input onChange={handlerStartReservation} value={currentReservation?currentReservation.reservation_date_start:new Date().toISOString().split('T')[0]} className="outline" id="reservation_date_start" name="reservation_date_start" type="date" placeholder="Mark"/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['reservation_date_start'] &&  `${errorsInput.reservation_date_start}`}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label className="text-xl" htmlFor="reservation_date_end">Reservation Date End</label>
                        <input value={currentReservation?currentReservation.reservation_date_end:new Date().toISOString().split('T')[0]} className="outline" id="reservation_date_end" name="reservation_date_end" type="date" placeholder="Mark" disabled/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['reservation_date_end'] &&  `${errorsInput.reservation_date_end}`}
                    </div>

                    <div className="flex flex-col mt-5">
                        <label className="text-xl" htmlFor="days">Days</label>
                        <input onChange={handlerDays} defaultValue={currentReservation?currentReservation.days:''} className="outline" id="days" name="days" type="number" placeholder="10"/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['days'] &&  `${errorsInput.days}`}
                    </div>

                    {
                       loadingRoomState && <h2 className="text-center text-sky-500">Loading...</h2> || errorState || (
                        <>
                        <div className="flex flex-col mt-5">
                            <label className="text-xl" htmlFor="room">Room</label>
                            <select value={currentReservation.room.id} onChange={(e)=>{
                            const newReservation = {
                                ...currentReservation,
                            }
                            const newRoom = roomsState?.find(el=>el.id === e.target.value);
                            if(newRoom){
                                newReservation.room = newRoom;
                                newReservation.amount = newRoom.price * newReservation.days;
                                setCurrentReservation(newReservation);
                            }}} className="outline" name="room" id="room">
                                <option value=""> Select..</option>
                                {
                                    roomsState?.map((el, index)=>{
                                        return <option key={index} value={el.id}>{el.name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="text-red-500">
                            {errorsInput['room'] && `${errorsInput.room}`}
                        </div>
                        </>
                        )
                    }

                    {
                       loadingUsers && <h2 className="text-center text-sky-500">Loading...</h2> || errorUsers || (
                        <>
                        <div className="flex flex-col mt-5">
                            <label className="text-xl" htmlFor="user">User</label>
                            <select value={currentReservation.user.id} onChange={(e)=>{
                            const newReservation = {
                                ...currentReservation,
                            }
                            const newUser = users?.find(el=>el.id === e.target.value);
                            if(newUser){
                                newReservation.user = newUser;
                                setCurrentReservation(newReservation);
                            }}} className="outline" name="user" id="user">
                                <option value=""> Select..</option>
                                {
                                    users?.map((el, index)=>{
                                        return <option key={index} value={el.id}>{`${el.username} - 
                                        ${el.dni}`}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="text-red-500">
                            {errorsInput['user'] && `${errorsInput.user}`}
                        </div>
                        </>
                        )
                    }

                    <div className="flex flex-col mt-5">
                        <label className="text-xl" htmlFor="state">State</label>
                        <select className="outline" onChange={handlerStates} defaultValue={'current'} name="state" id="state">
                            <option value=""> Select..</option>
                            {statesReservation.map((el, index)=><option key={index} value={el}>{el}</option>)}
                        </select>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['state'] &&  `${errorsInput.state}`}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label className="text-xl" htmlFor="amount">Amount</label>
                        <input value={currentReservation?currentReservation.amount:0} className="outline" id="amount" name="amount" type="number" placeholder="10" disabled/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['amount'] &&  `${errorsInput.amount}`}
                    </div>
                    
                    <div className="flex flex-col mt-5 ">
                        <Button type="submit">{actionType}</Button>
                    </div>
                    </>)}
                </form>
            </div>
            </div>
        </>
    )
}

export default ReserveForm