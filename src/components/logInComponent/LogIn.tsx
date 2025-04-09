import React, { JSX } from "react";
import { login, me } from "../../services/autoService";
import './LogIn.css'
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../provider/userProvider";
import Button from "../buttonComponent/Button";

function LogIn():JSX.Element{
    const navigate = useNavigate();
    const {setUser} = useUserContext();
    const handlerLogIn = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        try{
            const result = await login({username: formData.get("username") as string, password: formData.get("password") as string});
            console.log(result);
            const userData = await me();
            if(userData){
                setUser(userData);
                navigate("/home");
            }else{
                console.log("not user after login");
            }
        }catch(err){
            console.error(err);
        }
    }

    return (
        <>
           <div className="flex flex-col justify-start items-center">
            <form onSubmit={handlerLogIn} className="form-style bg-white shadow-lg rounded-lg p-8 w-full max-w-lg mt-20">
                <h2 className="text-2xl font-black text-center text-gray-700 mb-6">
                Log In
                </h2>
                <div className="mb-4">
                <label htmlFor="username" className="block text-gray-600 font-medium mb-1">
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John Doe"
                />
                </div>
                <div className="mb-4">
                <label htmlFor="password" className="block text-gray-600 font-medium mb-1">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                </div>
                <Button type="submit">LogIn</Button>
            </form>
           </div>
        </>
    );
}

export default LogIn