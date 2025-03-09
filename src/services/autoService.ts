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
    return response;
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
        if(response.status < 200 || response.status > 299){
            return undefined;
        }
        return response;
    }catch(err){
        console.log(err)
        return undefined;
    }
}