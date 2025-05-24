import { useEffect, useState } from "react";
import { getAllRols } from "../services/rolService";
import { Rol } from "../model/Rol";

export const useRol = ()=>{
    const [rols, setRols] = useState<Rol[]>([]);
    const [errorRol, setErrorRol] = useState<string>();
    useEffect(()=>{
        getAllRols().then(
            response=>{
                setRols(response);
            }
        ).catch(
            error=>{
                setErrorRol(error.message);
            }
        )
    }, []);
    return { errorRol, rols};
}   