import { UserType } from "../schemas/User";
import requestFetch from "./api";
const endpoint:string = 'auth/';

export interface IUserAuth{
    username:string,
    password:string
}
//, "Origin":"http://localhost:5173"
export const login = async (body:IUserAuth)=>{
    const response = await requestFetch(`${endpoint}login`, {
        headers: {"Content-Type":"application/json"},
        method:"POST",
        body: JSON.stringify(body),
        credentials: "include"
    });
    const loginData= await response.json();
    return loginData;
}

export const logout = async ()=>{
    await requestFetch(`${endpoint}logout`,{
        method:"POST",
        credentials: "include"
    })
}

export const me = async ()=>{
    try{
        const response = await requestFetch(`${endpoint}me`,{credentials: "include"});
        if(!response.ok){
            return undefined;
        }
        const userData = response.json();
        return userData;
    }catch(err){
        console.log(err)
        return undefined;
    }
}

export const register = async(body:UserType)=>{
    try{
        const response = await requestFetch(`${endpoint}register`, {
            headers: {'Content-type':'application/json'},
            method:'POST',
            body:JSON.stringify(body),
        })
        if(!response.ok){
            throw new Error('Registration failed');
        }
        const dataRegister = response.json();
        return dataRegister;
    }catch(err){
        console.log(err);
        return undefined;
    }
}