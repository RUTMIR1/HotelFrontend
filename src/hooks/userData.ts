import { useEffect, useState } from "react"
import { UserType } from "../schemas/User";
import { getUserById } from "../services/userService";

export const UseUserData = (id:string | undefined)=>{
    const [userData, setUserData] = useState<UserType | undefined>();
    const [err, setErr] = useState<string | undefined>(undefined);
 

    useEffect(()=>{
        if(id){
            getUserById(id).then(response=>{ 
               setUserData(response);
            }).catch(
                err=>{
                    setErr(err.message);
                }
            )
        }
    }, [id]);

    return {userData, err};
}