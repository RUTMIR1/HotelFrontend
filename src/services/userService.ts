import { User } from "../model/user";
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

export const createUser = async (user:User)=>{
  const response = await requestFetch(`${endpoint}`, {
    headers: {"Content-Type":"application/json"},
    credentials: 'include',
    method:'POST',
    body: JSON.stringify(user),
  });
  const userResponse = await response.json();
  if(!response.ok){
    throw new Error(userResponse.message); 
  }
  return userResponse;
}

export const updateUser = async (id:string, user:User)=>{
    const response = await requestFetch(`${endpoint}${id}`,{
        headers:{"Content-type":"application/json"},
        credentials: 'include',
        method:'PATCH',
        body: JSON.stringify(user)
    })
    const userResponse = await response.json();
    if(!response.ok){
        throw new Error(userResponse.message);
    }
    return userResponse;
}