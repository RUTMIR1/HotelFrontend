import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "../../hooks/formHook";
import { useRol } from "../../hooks/rol";
import Button from "../buttonComponent/Button";
import { JSX, useEffect, useState } from "react";
import { createUser, updateUser } from "../../services/userService";
import { User } from "../../model/User";
import { Model } from "../../model/Model";

function UserForm():JSX.Element{
    const {errorsInput, handlerForm} = useForm();
    const {errorRol, rols} = useRol();
    const [searchParams] = useSearchParams();
    const actionType = searchParams.get('action') || '';
    const location = useLocation();
    const dataState = location.state;
    const [currentUser, setCurrentUser] = useState<User>();

    useEffect(()=>{
        if(actionType === 'Update'){
            setCurrentUser(dataState.data);
        }else{
            setCurrentUser(User.empty());
        }
    },[actionType, dataState])

    const navigate = useNavigate();

    const action = async (data:Model)=>{
        if(actionType === 'Create'){
            try{
                const result = await createUser(data as User)
                return result;
            }catch(err){
                return err;
            }
        }else{
            try{
                const result = await updateUser(dataState.id, data as User);
                return result;
            }catch(err){
                return err;
            }
        }
    }

    const actionEnd = async ()=>{
        navigate(`/profile/manage/user?type=user`)
    }

    const handleInput = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
      ) => {
        const { name, value } = e.target;
        const parsedValue =
          name === 'age' || name === 'floor' || name === 'house_number' ? parseInt(value) : value;
        setCurrentUser({
          ...currentUser!,
          [name]: parsedValue,
        });
      };

    return (
        <>
            <div className="w-full flex justify-center items-center text-black">
            <div className="mt-5 w-full max-w-2xl">
                <form onSubmit={(e)=>handlerForm({e,currentModel:currentUser as Model,action, actionEnd})} className="rounded p-5 form-style">
                {currentUser && (<><h2 className="text-center text-4xl bg-sky-600 outline">User</h2>
                    <div className="flex flex-col mt-5">
                        <label className="text-xl" htmlFor="name">Name</label>
                        <input onChange={handleInput} defaultValue={currentUser?currentUser.name:''} className="outline" id="name" name="name" type="text" placeholder="Mark"/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['name'] &&  `${errorsInput.name}`}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label className="text-xl" htmlFor="last_name">LastName</label>
                        <input onChange={handleInput} defaultValue={currentUser?currentUser.last_name:''} className="outline" id="last_name" name="last_name" type="text" placeholder="Johnson"/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['last_name'] &&  `${errorsInput.last_name}`}
                    </div>
                    <div className="flex flex-col mt-5 ">
                        <label className="text-xl" htmlFor="age">Age</label>
                        <input onChange={handleInput} defaultValue={currentUser?currentUser.age:0} className="outline" id="age" name="age" type="number" placeholder="25"/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['age'] &&  `${errorsInput.age}`}
                    </div>
                    <div className="flex flex-col mt-5 ">
                        <label className="text-xl" htmlFor="dni">Dni</label>
                        <input onChange={handleInput} defaultValue={currentUser?currentUser.dni:''} className="outline" id="dni" name="dni" type="text" placeholder="3213214"/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['dni'] &&  `${errorsInput.dni}`}
                    </div>
                    <div className="flex flex-col mt-5 ">
                        <label className="text-xl" htmlFor="email">Email</label>
                        <input onChange={handleInput} defaultValue={currentUser?currentUser.email:''} className="outline" id="email" name="email" type="email" placeholder="youremail@gmail.com"/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['email'] &&  `${errorsInput.email}`}
                    </div>
                    <div className="flex flex-col mt-5 ">
                        <label className="text-xl" htmlFor="username">Username</label>
                        <input onChange={handleInput} defaultValue={currentUser?currentUser.username:''} className="outline" id="username" name="username" type="text" placeholder="tomi1"/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['username'] &&  `${errorsInput.username}`}
                    </div>
                    <div className="flex flex-col mt-5 ">
                        <label className="text-xl" htmlFor="password">Password</label>
                        <input onChange={handleInput} className="outline" id="password" name="password" type="password"/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['password'] &&  `${errorsInput.password}`}
                    </div>
                    <div className="flex flex-col mt-5 ">
                        <label className="text-xl" htmlFor="phone_number">Phone Number</label>
                        <input onChange={handleInput} defaultValue={currentUser ? currentUser.phone_number:''} className="outline" id="phone_number" name="phone_number" type="string" placeholder="+45 3274 942"/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['phone_number'] &&  `${errorsInput.phone_number}`}
                    </div>
                    {
                        errorRol || (
                        <>
                        <div className="flex flex-col mt-5">
                            <label className="text-xl" htmlFor="rolID">Rol</label>
                            <select value={currentUser.rol.id} onChange={(e)=>{
                            const newUser = {
                                ...currentUser,
                            }
                            const newRol = rols.find(el=>el.id === e.target.value);
                            if(newRol){
                                newUser.rol = newRol;
                                setCurrentUser(newUser);
                            }}} className="outline" name="rolID" id="rolID">
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
                        <input onChange={(e)=>{
                            const newUser = {
                                ...currentUser,
                            }
                            newUser.address.country = e.target.value;}}
                         defaultValue={currentUser?currentUser.address.country:''} className="outline" id="country" name="country" type="text" placeholder="USA"/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['country'] &&  `${errorsInput.country}`}
                    </div>
                    <div className="flex flex-col mt-5 ">
                        <label className="text-xl" htmlFor="province">Province</label>
                        <input onChange={(e)=>{
                            const newUser = {
                                ...currentUser,
                            }
                            newUser.address.province = e.target.value;}} defaultValue={currentUser?currentUser.address.province:''} className="outline" id="province" name="province" type="text" placeholder="Alabama"/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['province'] &&  `${errorsInput.province}`}
                    </div>
                    <div className="flex flex-col mt-5 ">
                        <label className="text-xl" htmlFor="city">City</label>
                        <input onChange={(e)=>{
                            const newUser = {
                                ...currentUser,
                            }
                            newUser.address.city = e.target.value;}} defaultValue={currentUser?currentUser.address.city:''} className="outline" id="city" name="city" type="text" placeholder="New York"/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['city'] &&  `${errorsInput.city}`}
                    </div>
                    <div className="flex flex-col mt-5 ">
                        <label className="text-xl" htmlFor="house_number">House Number</label>
                        <input onChange={(e)=>{
                            const newUser = {
                                ...currentUser,
                            }
                            newUser.address.house_number = parseInt(e.target.value);}} defaultValue={currentUser?currentUser.address.house_number:0} className="outline" id="house_number" name="house_number" type="number" placeholder="4"/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['house_number'] &&  `${errorsInput.house_number}`}
                    </div>
                    <div className="flex flex-col mt-5 ">
                        <label className="text-xl" htmlFor="floor">Floor</label>
                        <input onChange={(e)=>{
                            const newUser = {
                                ...currentUser,
                            }
                            newUser.address.floor = parseInt(e.target.value);}} defaultValue={currentUser?currentUser.address.floor:0} className="outline" id="floor" name="floor" type="number" placeholder="2"/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['floor'] &&  `${errorsInput.floor}`}
                    </div>
                    <div className="flex flex-col mt-5 ">
                        <Button type="submit">{actionType}</Button>
                    </div>
                    </>)}
                </form>
            </div>
            </div>
        </>
    )
}

export default UserForm