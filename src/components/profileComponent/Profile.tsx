import { JSX } from "react";
import { UseUserData } from "../../hooks/userData";
import { useUserContext } from "../../provider/userProvider";
import { useThemeContext } from "../../provider/themeProvider";

function Profile():JSX.Element{
    const {theme} = useThemeContext();
    const {user} = useUserContext();
    const {userData, err} = UseUserData(user?.id);
    
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
                        {
                            userData?.rol.name === "administrator" || userData?.rol.name === "owner" ?
                            <div className="mt-5">
                                <button className="text-3xl" type="button"> Usuarios </button>
                            </div>
                            : ''
                        }
                        <div className="mt-5">
                            <button className="text-3xl" type="button"> Mis Reservas</button>
                        </div>
                        
                    </>)
                    }
                </div>
            </div>
        </>
    )
}

export default Profile;