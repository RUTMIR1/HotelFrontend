import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "../../hooks/formHook";
import { useRol } from "../../hooks/rol";
import Button from "../buttonComponent/Button";
import { JSX, useEffect, useState } from "react";
import { Model } from "../../model/model";
import { createUser, updateUser } from "../../services/userService";
import { User } from "../../model/user";
import { UserType } from "../../schemas/User";

function UserForm():JSX.Element{
    const {errorsInput, handlerForm} = useForm();
    const {errorRol, rols} = useRol();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('type') || '';
    const actionType = searchParams.get('action') || '';
    const location = useLocation();
    const dataState = location.state;
    const [currentUser, setCurrentUser] = useState<UserType>();
    const [currentRol, setCurrentRol] = useState<string>();

    useEffect(()=>{
        if(actionType === 'Update'){
            setCurrentUser(dataState.data);
            setCurrentRol(dataState.data.rol.id);
        }
    },[actionType, dataState])

    const navigate = useNavigate();

    const action = async (data:Model)=>{
        if(actionType === 'Create'){
            await createUser(data as User).then(()=>{
                navigate(`/profile/manage/?type=user`)
            }).catch(
                err=>{
                    throw new Error(err.message);
                }
            )
        }else{
            await updateUser(dataState.id, data as User).then(()=>{
                navigate(`/profile/manage/?type=user`)
            }).catch(
                err=>{
                    throw new Error(err.message);
                }
            )
        }
    }

    return (
        <>
            <div className="w-full flex justify-center items-center text-black">
            <div className="mt-5 w-full max-w-2xl">
                <form onSubmit={(e)=>handlerForm({e,model:query,action})} className="rounded p-5 form-style">
                    <h2 className="text-center text-4xl bg-sky-600 outline">User</h2>
                    <div className="flex flex-col mt-5">
                        <label className="text-xl" htmlFor="name">Name</label>
                        <input defaultValue={currentUser?currentUser.name:''} className="outline" id="name" name="name" type="text" placeholder="Mark"/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['name'] &&  `${errorsInput.name}`}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label className="text-xl" htmlFor="last_name">LastName</label>
                        <input defaultValue={currentUser?currentUser.last_name:''} className="outline" id="last_name" name="last_name" type="text" placeholder="Johnson"/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['last_name'] &&  `${errorsInput.last_name}`}
                    </div>
                    <div className="flex flex-col mt-5 ">
                        <label className="text-xl" htmlFor="age">Age</label>
                        <input defaultValue={currentUser?currentUser.age:0} className="outline" id="age" name="age" type="number" placeholder="25"/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['age'] &&  `${errorsInput.age}`}
                    </div>
                    <div className="flex flex-col mt-5 ">
                        <label className="text-xl" htmlFor="dni">Dni</label>
                        <input defaultValue={currentUser?currentUser.dni:''} className="outline" id="dni" name="dni" type="text" placeholder="3213214"/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['dni'] &&  `${errorsInput.dni}`}
                    </div>
                    <div className="flex flex-col mt-5 ">
                        <label className="text-xl" htmlFor="email">Email</label>
                        <input defaultValue={currentUser?currentUser.email:''} className="outline" id="email" name="email" type="email" placeholder="youremail@gmail.com"/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['email'] &&  `${errorsInput.email}`}
                    </div>
                    <div className="flex flex-col mt-5 ">
                        <label className="text-xl" htmlFor="username">Username</label>
                        <input defaultValue={currentUser?currentUser.username:''} className="outline" id="username" name="username" type="text" placeholder="tomi1"/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['username'] &&  `${errorsInput.username}`}
                    </div>
                    <div className="flex flex-col mt-5 ">
                        <label className="text-xl" htmlFor="password">Password</label>
                        <input className="outline" id="password" name="password" type="password"/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['password'] &&  `${errorsInput.password}`}
                    </div>
                    <div className="flex flex-col mt-5 ">
                        <label className="text-xl" htmlFor="phone_number">Phone Number</label>
                        <input defaultValue={currentUser ? currentUser.phone_number:''} className="outline" id="phone_number" name="phone_number" type="string" placeholder="+45 3274 942"/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['phone_number'] &&  `${errorsInput.phone_number}`}
                    </div>
                    {
                        errorRol || (
                        <>
                        <div className="flex flex-col mt-5">
                            <label className="text-xl" htmlFor="rolID">Rol</label>
                            <select value={currentRol} onChange={(e)=>setCurrentRol(e.target.value)} className="outline" name="rolID" id="rolID">
                                {
                                    rols.map((el, index)=>{
                                        return <option key={index} value={el.id}>{el.name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="text-red-500">
                            {errorsInput['rol'] && `${errorsInput.rol}`}
                        </div>
                        </>
                        )
                    }
                    <h2 className="text-center text-4xl mt-5 bg-sky-600 outline">Address</h2>
                    <div className="flex flex-col mt-5 ">
                        <label className="text-xl" htmlFor="country">Country</label>
                        <input defaultValue={currentUser?currentUser.address.country:''} className="outline" id="country" name="country" type="text" placeholder="USA"/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['country'] &&  `${errorsInput.country}`}
                    </div>
                    <div className="flex flex-col mt-5 ">
                        <label className="text-xl" htmlFor="province">Province</label>
                        <input defaultValue={currentUser?currentUser.address.province:''} className="outline" id="province" name="province" type="text" placeholder="Alabama"/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['province'] &&  `${errorsInput.province}`}
                    </div>
                    <div className="flex flex-col mt-5 ">
                        <label className="text-xl" htmlFor="city">City</label>
                        <input defaultValue={currentUser?currentUser.address.city:''} className="outline" id="city" name="city" type="text" placeholder="New York"/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['city'] &&  `${errorsInput.city}`}
                    </div>
                    <div className="flex flex-col mt-5 ">
                        <label className="text-xl" htmlFor="house_number">House Number</label>
                        <input defaultValue={currentUser?currentUser.address.house_number:0} className="outline" id="house_number" name="house_number" type="number" placeholder="4"/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['house_number'] &&  `${errorsInput.house_number}`}
                    </div>
                    <div className="flex flex-col mt-5 ">
                        <label className="text-xl" htmlFor="floor">Floor</label>
                        <input defaultValue={currentUser?currentUser.address.floor:0} className="outline" id="floor" name="floor" type="number" placeholder="2"/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['floor'] &&  `${errorsInput.floor}`}
                    </div>
                    <div className="flex flex-col mt-5 ">
                        <Button type="submit">{actionType}</Button>
                    </div>
                </form>
            </div>
            </div>
        </>
    )
}

export default UserForm