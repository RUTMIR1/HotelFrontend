import { useEffect, useState } from "react"
import { getAllUsers, getUserById } from "../services/userService";
import { User } from "../model/User";

export const UseUser = (id:string | undefined=undefined)=>{
    const [user, setUser] = useState<User>();
    const [users, setUsers] = useState<User[]>();
    const [errorUsers, setErrorUsers] = useState<string>();
    const [loadingUsers, setLoadingUsers] = useState<boolean>(true);
 

    useEffect(()=>{
        if(id){
            getUserById(id).then(response=>setUser(response)).catch(
                err=>setErrorUsers(err.message)
            ).finally(
                ()=>setLoadingUsers(false)
            )
        }else{
            getAllUsers().then(response=>setUsers(response)).catch(
                err=>setErrorUsers(err.message)
            ).finally(
                ()=>setLoadingUsers(false)
            )
        }
    }, [id]);

    return {users, errorUsers, loadingUsers, user};
}
