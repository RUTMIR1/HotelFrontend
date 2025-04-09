import { JSX } from "react";
import { UseUserData } from "../../hooks/userData";
import { useUserContext } from "../../provider/userProvider";
import { useThemeContext } from "../../provider/themeProvider";
import Button from "../buttonComponent/Button";
import { useNavigate } from "react-router-dom";

function Profile():JSX.Element{
    const {theme} = useThemeContext();
    const {user} = useUserContext();
    const {userData, err} = UseUserData(user?.id);

    const navigate = useNavigate();
    
    return (
        <>
            <div className={`h-screen bg-slate-950 text-center border-1  ${theme}`}>
                <div>
                    {err ? (
                        <>
                        <div className="text-4xl text-red-500">{err}</div>
                        </>
                    )
                    :(
                    <>
                        <div className="text-4xl">
                            <h2>My Profile</h2>
                        </div>
                        <br />
                        <div className="border-b-1">
                            <div className="flex gap-1 justify-center items-center">
                                <p className="text-2xl">Name:</p>
                                <p className="text-lg">{`  ${userData?.username} ${userData?.last_name}`}</p>
                            </div>
                            <div className="flex gap-1 justify-center items-center">
                                <p className="text-2xl">Username:</p>
                                <p className="text-lg">{`${userData?.username}`}</p>
                            </div>
                            <div className="flex gap-1 justify-center items-center">
                                <p className="text-2xl">DNI:</p>
                                <p className="text-lg">{`${userData?.dni}`}</p>
                            </div>
                            <div className="flex gap-1 justify-center items-center">
                                <p className="text-2xl">Age:</p>
                                <p className="text-lg">{`${userData?.age}`}</p>
                            </div>
                            <div className="flex gap-1 justify-center items-center">
                                <p className="text-2xl">Email:</p>
                                <p className="text-lg">{`${userData?.email}`}</p>
                            </div>
                            <div className="flex gap-1 justify-center items-center">
                                <p className="text-2xl">Phone Number:</p>
                                <p className="text-lg">{`${userData?.phone_number}`}</p>
                            </div>
                            <div className="flex gap-1 justify-center items-center">
                                <p className="text-2xl">Rol:</p>
                                <p className="text-lg">{`${userData?.rol.name}`}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                        {
                            userData?.rol.name === "administrator" || userData?.rol.name === "owner" ?
                            (
                                <>
                                    <div className="text-2xl mt-5 w-full max-w-md">
                                        <Button onClick={()=>navigate(`/profile/manage/?type=user`)}>Users</Button>
                                    </div>
                                    <div className="text-2xl mt-5 w-full max-w-md">
                                        <Button>Rooms</Button>
                                    </div>
                                    <div className="text-2xl mt-5 w-full max-w-md">
                                        <Button>Reserves</Button>
                                    </div>
                                    <div className="text-2xl mt-5 w-full max-w-md">
                                        <Button>Categories</Button>
                                    </div>
                                    <div className="text-2xl mt-5 w-full max-w-md">
                                        <Button>Rols</Button>
                                    </div>
                                </>
                            )
                            : ''
                        }{
                            userData?.rol.name === "user" &&
                            (
                                <>
                                    <div className="text-2xl mt-5 w-full max-w-md">
                                        <Button>My Reserves</Button>
                                    </div>
                                </>
                            )
                        }
                        </div>
                        
                    </>)
                    }
                </div>
            </div>
        </>
    )
}

export default Profile;