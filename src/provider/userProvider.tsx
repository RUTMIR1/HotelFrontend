import React, { ReactNode, useContext, useEffect, useState} from "react";
import { me } from "../services/autoService";

export interface IUserSession{
    username:string,
    rol:string,
    id:string,
}

const userContext = React.createContext<{userSession:IUserSession | undefined; setUserSession:React.Dispatch<React.SetStateAction<IUserSession| undefined>>
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
    const [userSession, setUserSession] = useState<IUserSession | undefined>(undefined);

    useEffect(()=>{
        me().then(response=>{
            setUserSession(response)
        }).catch(()=>{
            return;
        })
    }, [])
    
    return (
        <userContext.Provider value={{userSession, setUserSession}}>
            {children}
        </userContext.Provider>
    )
}