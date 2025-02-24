import { JSX } from "react";
import './LogIn.css'
function LogIn():JSX.Element{
    return (
        <>
           <div className="flex flex-col justify-start items-center min-h-screen">
            <form className="form-style bg-white shadow-lg rounded-lg p-8 w-full max-w-lg mt-20">
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
                <button
                type="submit"
                className="w-full text-stone-900 py-2 px-4 rounded-lg transition duration-300"
                >
                LogIn
                </button>
            </form>
           </div>
        </>
    );
}

export default LogIn