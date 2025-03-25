import requestFetch from "./api";

const endpoint:string = 'user/';

export const getUserById = async (id:string)=>{
    const response = await requestFetch(`${endpoint}${id}`,{
        credentials: 'include'
    });
    const user = await response.json();
    if(!response.ok){
        throw new Error(user.message);
    }   
    return user;
}