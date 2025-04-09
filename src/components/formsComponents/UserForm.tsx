import Button from "../buttonComponent/Button";
import { JSX } from "react";

function UserForm():JSX.Element{
    return (
        <>
            <div className="w-full flex justify-center items-center text-black">
            <div className="mt-5 w-full max-w-2xl">
                <form className="rounded p-5 form-style">
                    <h2 className="text-center text-4xl bg-sky-600 outline">User</h2>
                    <div className="flex flex-col mt-5">
                        <label className="text-xl" htmlFor="name">Name</label>
                        <input className="outline" id="name" name="name" type="text" placeholder="Mark"/>
                    </div>
                    <div className="flex flex-col mt-5">
                        <label className="text-xl" htmlFor="last_name">LastName</label>
                        <input className="outline" id="last_name" name="last_name" type="text" placeholder="Johnson"/>
                    </div>
                    <div className="flex flex-col mt-5 ">
                        <label className="text-xl" htmlFor="age">Age</label>
                        <input className="outline" id="age" name="age" type="number" placeholder="25"/>
                    </div>
                    <div className="flex flex-col mt-5 ">
                        <label className="text-xl" htmlFor="dni">Dni</label>
                        <input className="outline" id="dni" name="dni" type="text" placeholder="3213214"/>
                    </div>
                    <div className="flex flex-col mt-5 ">
                        <label className="text-xl" htmlFor="email">Email</label>
                        <input className="outline" id="email" name="email" type="email" placeholder="youremail@gmail.com"/>
                    </div>
                    <div className="flex flex-col mt-5 ">
                        <label className="text-xl" htmlFor="username">Username</label>
                        <input className="outline" id="username" name="username" type="text" placeholder="tomi1"/>
                    </div>
                    <div className="flex flex-col mt-5 ">
                        <label className="text-xl" htmlFor="password">Password</label>
                        <input className="outline" id="password" name="password" type="password"/>
                    </div>
                    <div className="flex flex-col mt-5 ">
                        <label className="text-xl" htmlFor="phone_number">Phone Number</label>
                        <input className="outline" id="phone_number" name="phone_number" type="text" placeholder="+45 3274 942"/>
                    </div>
                    <h2 className="text-center text-4xl mt-5 bg-sky-600 outline">Address</h2>
                    <div className="flex flex-col mt-5 ">
                        <label className="text-xl" htmlFor="country">Country</label>
                        <input className="outline" id="country" name="country" type="text" placeholder="USA"/>
                    </div>
                    <div className="flex flex-col mt-5 ">
                        <label className="text-xl" htmlFor="province">Province</label>
                        <input className="outline" id="province" name="province" type="text" placeholder="Alabama"/>
                    </div>
                    <div className="flex flex-col mt-5 ">
                        <label className="text-xl" htmlFor="city">City</label>
                        <input className="outline" id="city" name="city" type="text" placeholder="New York"/>
                    </div>
                    <div className="flex flex-col mt-5 ">
                        <label className="text-xl" htmlFor="house_number">House Number</label>
                        <input className="outline" id="house_number" name="house_number" type="text" placeholder="4"/>
                    </div>
                    <div className="flex flex-col mt-5 ">
                        <label className="text-xl" htmlFor="floor">Floor</label>
                        <input className="outline" id="floor" name="floor" type="text" placeholder="2"/>
                    </div>
                    <div className="flex flex-col mt-5 ">
                        <Button type="submit">CREATE</Button>
                    </div>
                </form>
            </div>
            </div>
        </>
    )
}

export default UserForm