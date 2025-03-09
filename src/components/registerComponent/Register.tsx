import { JSX } from "react";

import './Register.css'
import { useUser } from "../../hooks/user";
function Register():JSX.Element{
    const {name, lastname, age, username, password, email, phoneNumber, country, 
        province, city, houseNumber, floor, handlerForm} = useUser();

    
    return (
        <>
            <div className="text-gray-600 flex flex-col justify-start items-center text-black min-h-screen">
                <form onSubmit={(e)=>handlerForm(e)} className="form-style bg-white w-auto max-w-lg shadow-lg p-8 rounded-lg w-full w-max-lg mt-20">
                    <h2 className="text-2xl text-center font-black text-gray-700 mb-7">Register</h2>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="name">Name</label>
                        <input className="rounded-lg border border-gray-500" id="name" name="name" type="text" placeholder="Jhon"/>
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="last-name">lastName</label>
                        <input className="rounded-lg border border-gray-500" id="last-name" name="last-name" type="text" placeholder="Doe"/>
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="age">Age</label>
                        <input   className="rounded-lg border border-gray-500" id="age" name="age" type="number" placeholder="Doe"/>
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="username">Username</label>
                        <input className="rounded-lg border border-gray-500" id="username" name="username" type="text" placeholder="JhonDoe"/>
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="password">Password</label>
                        <input className="rounded-lg border border-gray-500" id="password" name="password" type="password"/>
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="email">Email</label>
                        <input className="rounded-lg border border-gray-500" id="email" name="email" type="email" placeholder="JhonDoe@gmail.com"/>
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="phone">Phone Number</label>
                        <input className="rounded-lg border border-gray-500" id="phone" name="phone" type="text" placeholder="+5434156321"/>
                    </div>
                    <h3 className="text-xl text-center mt-5">Address</h3>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="country">Country</label>
                        <input className="rounded-lg border border-gray-500" id="country" name="country" type="text" placeholder="Argentina"/>
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="province">Province</label>
                        <input className="rounded-lg border border-gray-500" id="province" name="province" type="text" placeholder="Cordoba"/>
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="city">City</label>
                        <input className="rounded-lg border border-gray-500" id="city" name="city" type="text" placeholder="Alta Gracia"/>
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="house-number">House Number</label>
                        <input className="rounded-lg border border-gray-500" id="house-number" name="house-number" type="number" placeholder="80"/>
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="floor">Floor</label>
                        <input className="rounded-lg border border-gray-500" id="floor" name="floor" type="number" placeholder="2"/>
                    </div>
                    <h3 className="text-xl text-center mt-5">Accept terms and conditions</h3>
                    <a className="text-blue-500 text-center block" href="">Look Terms and Conditions</a>
                    <div className="flex justify-center items-center mt-5">
                        <label htmlFor="accept">Yes:</label>
                        <input className="cursor-pointer w-5" id="accept" name="ok" type="radio" value={'true'} />
                        <label htmlFor="reject">No:</label>
                        <input className="cursor-pointer w-5" id="reject" name="ok" type="radio" value={'false'}/>
                    </div>
                    <div className="flex flex-col mt-5">
                        <button type="submit" className="rounded-lg py-2 wx-4 w-full transition duration 300">Register</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register