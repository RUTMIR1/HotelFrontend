import { JSX } from "react";
import { useUserContext } from "../../provider/userProvider";
import { useThemeContext } from "../../provider/themeProvider";
import Button from "../buttonComponent/Button";
import { useNavigate } from "react-router-dom";
import { UseUser } from "../../hooks/user";

function Profile():JSX.Element{
    const {theme} = useThemeContext();
    const {userSession} = useUserContext();
    const {user, errorUsers, loadingUsers} = UseUser(userSession?.id);

    const navigate = useNavigate();
    
    return (
        <>
            <div className={`h-screen bg-slate-950 text-center border-1  ${theme}`}>
                <div>
                    {
                        loadingUsers? <div className="text-4xl text-sky-500">Loading ...</div> :
                        (
                        <>
                            {errorUsers ?<div className="text-4xl text-red-500">{errorUsers}</div>
                            :(
                            <>
                                <div className="text-4xl">
                                    <h2>My Profile</h2>
                                </div>
                                <br />
                                <div className="border-b-1">
                                    <div className="flex gap-1 justify-center items-center">
                                        <p className="text-2xl">Name:</p>
                                        <p className="text-lg">{`  ${user?.username} ${user?.last_name}`}</p>
                                    </div>
                                    <div className="flex gap-1 justify-center items-center">
                                        <p className="text-2xl">Username:</p>
                                        <p className="text-lg">{`${user?.username}`}</p>
                                    </div>
                                    <div className="flex gap-1 justify-center items-center">
                                        <p className="text-2xl">DNI:</p>
                                        <p className="text-lg">{`${user?.dni}`}</p>
                                    </div>
                                    <div className="flex gap-1 justify-center items-center">
                                        <p className="text-2xl">Age:</p>
                                        <p className="text-lg">{`${user?.age}`}</p>
                                    </div>
                                    <div className="flex gap-1 justify-center items-center">
                                        <p className="text-2xl">Email:</p>
                                        <p className="text-lg">{`${user?.email}`}</p>
                                    </div>
                                    <div className="flex gap-1 justify-center items-center">
                                        <p className="text-2xl">Phone Number:</p>
                                        <p className="text-lg">{`${user?.phone_number}`}</p>
                                    </div>
                                    <div className="flex gap-1 justify-center items-center">
                                        <p className="text-2xl">Rol:</p>
                                        <p className="text-lg">{`${user?.rol.name}`}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center">
                                {
                                    user?.rol.name === "administrator" || user?.rol.name === "owner" ?
                                    (
                                        <>
                                            <div className="text-2xl mt-5 w-full max-w-md">
                                                <Button onClick={()=>navigate(`/profile/manage/user?type=user`)}>Users</Button>
                                            </div>
                                            <div className="text-2xl mt-5 w-full max-w-md">
                                                <Button onClick={()=>navigate(`/profile/manage/room?type=room`)}>Rooms</Button>
                                            </div>
                                            <div className="text-2xl mt-5 w-full max-w-md">
                                                <Button onClick={()=>navigate(`/profile/manage/reservation?type=reservation`)}>Reserves</Button>
                                            </div>
                                            <div className="text-2xl mt-5 w-full max-w-md">
                                                <Button onClick={()=>navigate(`/Profile/manage/category?type=category`)}>Categories</Button>
                                            </div>
                                            <div className="text-2xl mt-5 w-full max-w-md">
                                                <Button onClick={()=>navigate(`/profile/manage/rol?type=rol`)}>Rols</Button>
                                            </div>
                                        </>
                                    )
                                    : ''
                                }{
                                    user?.rol.name === "user" &&
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
                            </>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Profile;