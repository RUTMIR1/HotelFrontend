import React, { ReactNode, useContext, useEffect, useState} from "react";
import { me } from "../services/autoService";

export interface IUserSession{
    username:string,
    rol:string,
    id:string,
}

const userContext = React.createContext<{user:IUserSession | undefined; setUser:React.Dispatch<React.SetStateAction<IUserSession| undefined>>
     } | undefined>(undefined);
//const userChangeContext = React.createContext();

export const useUserContext = ()=>{
    const context = useContext(userContext);
    if(!context) throw new Error('Context userContext must be used in to UserContext.Provider')
    return context;
}


interface IUserProviderProps{
    children: ReactNode;
}

export function UserProvider({children}:IUserProviderProps){
    const [user, setUser] = useState<IUserSession | undefined>(undefined);

    useEffect(()=>{
        me().then(response=>{
            setUser(response)
        }).catch(()=>{
            return;
        })
    }, [])
    
    return (
        <userContext.Provider value={{user, setUser}}>
            {children}            
        </userContext.Provider>
    )
}