import { JSX, useState } from "react";

import './Register.css'
import { useUser } from "../../hooks/user";
import ModalText from "../modalTextComponent/modalText";
import { termsConditions } from "../../utils/utils";
function Register():JSX.Element{
    const {user, handlerForm} = useUser();
    const [isModal, setIsModal] = useState(false);

    return (
        <>
            <div className="text-gray-600 flex flex-col justify-start items-center text-black min-h-screen">
                <form onSubmit={(e)=>handlerForm(e)} className="form-style bg-white w-auto max-w-lg shadow-lg p-8 rounded-lg w-full w-max-lg mt-20">
                    <h2 className="text-2xl text-center font-black text-gray-700 mb-7">Register</h2>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="name">Name</label>
                        <input required className={`rounded-lg border ${user.name.status?"border-red-500":"border-gray-500"}`} id="name" name="name" type="text" placeholder="Jhon"/>
                    </div>
                    <div className="text-red-500">
                        {user.name.status ? `${user.name.data}`:``}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="last-name">lastName</label>
                        <input required className={`rounded-lg border ${user.last_name.status?"border-red-500":"border-gray-500"}`} id="last-name" name="last-name" type="text" placeholder="Doe"/>
                    </div>
                    <div className="text-red-500">
                        {user.last_name.status ? `${user.last_name.data}`:``}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="age">Age</label>
                        <input required   className={`rounded-lg border ${user.age.status?"border-red-500":"border-gray-500"}`} id="age" name="age" type="number" placeholder="Doe"/>
                    </div>
                    <div className="text-red-500">
                        {user.age.status ? `${user.age.data}`:``}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="username">Username</label>
                        <input required className={`rounded-lg border ${user.username.status?"border-red-500":"border-gray-500"}`} id="username" name="username" type="text" placeholder="JhonDoe"/>
                    </div>
                    <div className="text-red-500">
                        {user.username.status ? `${user.username.data}`:``}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="password">Password</label>
                        <input required className={`rounded-lg border ${user.password.status?"border-red-500":"border-gray-500"}`} id="password" name="password" type="password"/>
                    </div>
                    <div className="text-red-500">
                        {user.password.status ? `${user.password.data}`:``}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="email">Email</label>
                        <input required className={`rounded-lg border ${user.email.status?"border-red-500":"border-gray-500"}`} id="email" name="email" type="email" placeholder="JhonDoe@gmail.com"/>
                    </div>
                    <div className="text-red-500">
                        {user.email.status ? `${user.email.data}`:``}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="phone">Phone Number</label>
                        <input required className={`rounded-lg border ${user.phone_number.status?"border-red-500":"border-gray-500"}`} id="phone" name="phone" type="text" placeholder="+5434156321"/>
                    </div>
                    <div className="text-red-500">
                        {user.phone_number.status ? `${user.phone_number.data}`:``}
                    </div>
                    <h3 className="text-xl text-center mt-5">Address</h3>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="country">Country</label>
                        <input required className={`rounded-lg border ${user.country.status?"border-red-500":"border-gray-500"}`} id="country" name="country" type="text" placeholder="Argentina"/>
                    </div>
                    <div>
                        {user.country.status ? `${user.country.data}`: ``}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="province">Province</label>
                        <input required className={`rounded-lg border ${user.province.status?"border-red-500":"border-gray-500"}`} id="province" name="province" type="text" placeholder="Cordoba"/>
                    </div>
                    <div className="text-red-500">
                        {user.province.status ? `${user.province.data}`:``}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="city">City</label>
                        <input required className={`rounded-lg border ${user.city.status?"border-red-500":"border-gray-500"}`} id="city" name="city" type="text" placeholder="Alta Gracia"/>
                    </div>
                    <div className="text-red-500">
                        {user.city.status ? `${user.city.data}`:``}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="house-number">House Number</label>
                        <input required className={`rounded-lg border ${user.house_number.status?"border-red-500":"border-gray-500"}`} id="house-number" name="house-number" type="number" placeholder="80"/>
                    </div>
                    <div className="text-red-500">
                        {user.house_number.status ? `${user.house_number.data}`:``}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="floor">Floor:</label>
                        <input required className={`rounded-lg border ${user.floor.status?"border-red-500":"border-gray-500"}`} id="floor" name="floor" type="number" placeholder="2"/>
                    </div>
                    <div className="text-red-500">
                        {user.floor.status ? `${user.floor.data}`:``}
                    </div>
                    <h3 className="text-xl text-center mt-5">Accept terms and conditions</h3>
                    <a onClick={(e)=>{
                        e.preventDefault();
                        setIsModal(true)}
                        } className="text-blue-500 text-center block" href="">Look Terms and Conditions</a>
                    <div className="flex justify-center items-center mt-5">
                        <label htmlFor="accept">Yes:</label>
                        <input className="cursor-pointer w-5" id="accept" name="ok" type="radio" value={'true'} required />
                        <label htmlFor="reject">No:</label>
                        <input className="cursor-pointer w-5" id="reject" name="ok" type="radio" value={'false'} required defaultChecked/>
                    </div>
                    <div className="text-red-500">
                        {user.ok.status ? `${user.ok.data}`:``}
                    </div>
                    <div className="flex flex-col mt-5">
                        <button type="submit" className="rounded-lg py-2 wx-4 w-full transition duration 300">Register</button>
                    </div>
                </form>
            </div>
            {isModal? <ModalText title="Terms and Conditions" text={termsConditions} setModal={setIsModal}></ModalText> : ``};
        </>
    )
}

export default Register