import { useEffect, useState } from "react"
import { RolType } from "../schemas/Rol";
import { getAllRols } from "../services/rolService";

export const useRol = ()=>{
    const [rols, setRols] = useState<RolType[]>([]);
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