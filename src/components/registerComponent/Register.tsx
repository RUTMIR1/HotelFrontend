import { JSX, useEffect, useState } from "react";

import './Register.css'
import ModalText from "../modalTextComponent/modalText";
import { termsConditions } from "../../utils/utils";
import Button from "../buttonComponent/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "../../hooks/formHook";
import { User } from "../../model/User";
import { Model } from "../../model/Model";
import { login, me, register } from "../../services/autoService";
import { useUserContext } from "../../provider/userProvider";
function Register():JSX.Element{
    const {errorsInput, handlerForm} = useForm();
    const [isOkConditions, setIsOkConditions] = useState<boolean | null>(null);
    const [currentUser, setCurrentUser] = useState<User>(User.empty());
    const [isModal, setIsModal] = useState(false);
    const [searchParams] = useSearchParams();

    const {setUserSession} = useUserContext();

    const navigate = useNavigate();

    const back = searchParams.get('back');

    useEffect(()=>{
        console.log(back);
    },[back])

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

    const action = async (data:Model)=>{
        try{
            const user = data as User;
            console.log(user);
            const response = await register(user);
            if(response.status >= 200 && response.status <= 299){
                await login({username: user.username, password:user.password})
                const userData = await me();
                setUserSession(userData);
            }
            return response;
        }catch(err){
            return err;
        }
    }
    const actionEnd = async ()=>{
        console.log(back);
        if(back){
            navigate(`/${back.split('.').join('/')}`);
        }else{
            navigate(`/`);
        }
    }

    return (
        <>
            <div className="text-gray-600 flex flex-col justify-start items-center text-black min-h-screen">
                <form onSubmit={(e)=>isOkConditions && handlerForm({e,currentModel:currentUser as Model, action, actionEnd})} className="form-style bg-white w-auto max-w-lg shadow-lg p-8 rounded-lg w-full w-max-lg mt-20">
                    <h2 className="text-2xl text-center font-black text-gray-700 mb-7">Register</h2>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="name">Name</label>
                        <input onChange={handleInput} defaultValue={currentUser?currentUser.name:''}  required className={`rounded-lg border ${errorsInput['name']?"border-red-500":"border-gray-500"}`} id="name" name="name" type="text" placeholder="Jhon"/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['name'] && `${errorsInput.name}`}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="last-name">lastName</label>
                        <input onChange={handleInput} defaultValue={currentUser?currentUser.last_name:''}  required className={`rounded-lg border ${errorsInput['last_name']?"border-red-500":"border-gray-500"}`} id="last_name" name="last_name" type="text" placeholder="Doe"/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['last_name'] && `${errorsInput.last_name}`}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="age">Age</label>
                        <input onChange={handleInput} defaultValue={currentUser?currentUser.age:''}  required className={`rounded-lg border ${errorsInput['age']?"border-red-500":"border-gray-500"}`} id="age" name="age" type="number" placeholder="Doe"/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['age'] && `${errorsInput.age}`}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="dni">Dni</label>
                        <input onChange={handleInput} defaultValue={currentUser?currentUser.dni:''} required className={`rounded-lg border ${errorsInput['dni']?"border-red-500":"border-gray-500"}`} id="dni" name="dni" type="text" placeholder="32456645"/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['dni'] && `${errorsInput.dni}`}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="username">Username</label>
                        <input onChange={handleInput} defaultValue={currentUser?currentUser.username:''} required className={`rounded-lg border ${errorsInput['username']?"border-red-500":"border-gray-500"}`} id="username" name="username" type="text" placeholder="JhonDoe"/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['username'] && `${errorsInput.username}`}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="password">Password</label>
                        <input onChange={handleInput} defaultValue={currentUser?currentUser.password:''} required className={`rounded-lg border ${errorsInput['password']?"border-red-500":"border-gray-500"}`} id="password" name="password" type="password"/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['password'] && `${errorsInput.password}`}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="email">Email</label>
                        <input onChange={handleInput} defaultValue={currentUser?currentUser.email:''} required className={`rounded-lg border ${errorsInput['email']?"border-red-500":"border-gray-500"}`} id="email" name="email" type="email" placeholder="JhonDoe@gmail.com"/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['email'] && `${errorsInput.email}`}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="phone">Phone Number</label>
                        <input onChange={handleInput} defaultValue={currentUser?currentUser.phone_number:''} required className={`rounded-lg border ${errorsInput['phone_number']?"border-red-500":"border-gray-500"}`} id="phone_number" name="phone_number" type="text" placeholder="+5434156321"/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['phone_number'] && `${errorsInput.phone_number}`}
                    </div>
                    <h3 className="text-xl text-center mt-5">Address</h3>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="country">Country</label>
                        <input onChange={(e)=>{
                            const newUser = {
                                ...currentUser,
                            }
                            newUser.address.country = e.target.value;}} defaultValue={currentUser?currentUser.address.country:''}  required className={`rounded-lg border ${errorsInput['country']?"border-red-500":"border-gray-500"}`} id="country" name="country" type="text" placeholder="Argentina"/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['country'] && `${errorsInput.country}`}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="province">Province</label>
                        <input onChange={(e)=>{
                            const newUser = {
                                ...currentUser,
                            }
                            newUser.address.province = e.target.value;}} defaultValue={currentUser?currentUser.address.province:''} required className={`rounded-lg border ${errorsInput['province']?"border-red-500":"border-gray-500"}`} id="province" name="province" type="text" placeholder="Cordoba"/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['province'] && `${errorsInput.province}`}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="city">City</label>
                        <input onChange={(e)=>{
                            const newUser = {
                                ...currentUser,
                            }
                            newUser.address.city = e.target.value;}} defaultValue={currentUser?currentUser.address.city:''} required className={`rounded-lg border ${errorsInput['city']?"border-red-500":"border-gray-500"}`} id="city" name="city" type="text" placeholder="Alta Gracia"/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['city'] && `${errorsInput.city}`}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="house-number">House Number</label>
                        <input onChange={(e)=>{
                            const newUser = {
                                ...currentUser,
                            }
                            newUser.address.house_number = parseInt(e.target.value);}} defaultValue={currentUser?currentUser.address.house_number:''} required className={`rounded-lg border ${errorsInput['house_number']?"border-red-500":"border-gray-500"}`} id="house-number" name="house-number" type="number" placeholder="80"/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['house_number'] && `${errorsInput.house_number}`}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="floor">Floor:</label>
                        <input onChange={(e)=>{
                            const newUser = {
                                ...currentUser,
                            }
                            newUser.address.floor = parseInt(e.target.value);}} defaultValue={currentUser?currentUser.address.floor:''} required className={`rounded-lg border ${errorsInput['floor']?"border-red-500":"border-gray-500"}`} id="floor" name="floor" type="number" placeholder="2"/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['floor'] && `${errorsInput.floor}`}
                    </div>
                    <h3 className="text-xl text-center mt-5">Accept terms and conditions</h3>
                    <a onClick={(e)=>{
                        e.preventDefault();
                        setIsModal(true)}
                        } className="text-blue-500 text-center block" href="">Look Terms and Conditions</a>
                    <div className="flex justify-center items-center mt-5">
                        <label htmlFor="accept">Yes:</label>
                        <input onChange={()=>setIsOkConditions(true)} className="cursor-pointer w-5" id="accept" name="ok" type="radio" value={'true'} required />
                        <label htmlFor="reject">No:</label>
                        <input onChange={()=>setIsOkConditions(false)} className="cursor-pointer w-5" id="reject" name="ok" type="radio" value={'false'} required defaultChecked/>
                    </div>
                    <div className="text-red-500">
                        { isOkConditions === null || !isOkConditions?'You must acepted our conditions':''}
                    </div>
                    <div className="flex flex-col mt-5">
                        <Button isDisabled={isOkConditions !== null?!isOkConditions:true} type="submit">Registrar</Button>
                    </div>
                </form>
            </div>
            {isModal? <ModalText title="Terms and Conditions" text={termsConditions} setModal={setIsModal}></ModalText> : ``};
        </>
    )
}

export default Register