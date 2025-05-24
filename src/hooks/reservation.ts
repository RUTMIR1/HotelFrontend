import { useEffect, useState } from "react";
import { getAllReservations } from "../services/reservationService";
import { Reservation } from "../model/Reservation";

export const UseReservation = ()=>{
    const [reservations, setReservations] =useState<Reservation[]>();
    const [currentReservations, setCurrentReservations] = useState<Reservation[]>();
    const [errorReservations , setErrorReservations] = useState<string>();
    const [loadingReservations, setLoadingReservations]= useState<boolean>(true);

    useEffect(()=>{
        getAllReservations().then(
            reservations=>{
                setReservations(reservations);
                setCurrentReservations(reservations);
            }
        ).catch(
            error=>{
                setErrorReservations(error.message);
            }
        ).finally(
            ()=>{
                setLoadingReservations(false);
            }
        )
    }, [])

    return { reservations, errorReservations, loadingReservations, currentReservations };
}