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

export const getAllUsers = async ()=>{
    const response = await requestFetch(`${endpoint}`,{
        credentials: 'include'
    });
    const users = await response.json();
    if(!response.ok){
        throw new Error(users.message);
    }
    return users;
}