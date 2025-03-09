import { JSX } from "react"
import { NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react"
import Button from "../buttonComponent/Button"
import './Header.css'
import { useUserContext } from "../../provider/userProvider"
import { logout } from "../../services/autoService"
import { useThemeContext } from "../../provider/themeProvider"


function Header():JSX.Element{
    const {user, setUser} = useUserContext();
    const {theme, setTheme} = useThemeContext();
    const [isMenuThemeOpen, setIsMenuThemeOpen] = useState(false);

    const navigate = useNavigate();

    const handlerLogOut = async():Promise<void>=>{
        await logout();
        setUser(undefined);
        navigate('/home');
    }
    useEffect(():void=>{
        setIsMenuThemeOpen(false);
    }, [theme]);

    return (
        <>
        <header className={`light-theme z-999 text-2xl p-3 h-25 flex justify-around items-center gap-2
         text-center sticky top-0 right-0 left-0 font-black ${theme}`}>
            <figure className="flex items-center w-25 max-md:hidden">
                <img className="" src="icon.png" alt="icon"/>
            </figure>
            <nav className="flex flex-auto items-center justify-around max-lg:hidden">
                    <NavLink className={'item'} to='/'>Home</NavLink>
                    <a className="item">
                        Services
                    </a>   
                    <a className="item">
                        Rooms
                    </a>
                    <a className="item">
                        Contact
                    </a>
                    <a className="item">
                        About Hotel
                    </a>
            </nav>
            <div className="flex flex-row justify-center max-md:w-auto">
                <div className="relative">
                    <Button children={'Theme'} onClick={():void=>setIsMenuThemeOpen(!isMenuThemeOpen)}></Button>
                    <div className={`absolute top-15 left-0 list text-sm border-2 border-stone-500
                        ${isMenuThemeOpen ? '':'not-show'}`}>
                        <span>Select Theme:</span>
                        <ul>
                            <li className="border-1 border-stone-500 option" onClick={():void =>setTheme('light-theme')}>Light</li>
                            <li className="border-1 border-stone-500 option" onClick={():void =>setTheme('dark-theme')}>Dark</li>
                        </ul>
                    </div>
                </div>
                {
                    user ? (
                        <>
                        <div>
                            <Button children={'Perfil'} onClick={():void | Promise<void>=> navigate('/register')}></Button>
                        </div>
                        <div>
                            <Button children={'LogOut'} onClick={()=>{handlerLogOut()}}></Button>
                        </div>
                        </>
                    ):(
                        <>
                        <div>
                            <Button children={'Register'} onClick={():void | Promise<void>=> navigate('/register')}></Button>
                        </div>
                        <div>
                            <Button children={'LogIn'} onClick={():void | Promise<void>=>{navigate('/login')}}></Button>
                        </div>
                        </>
                    )
                }
            </div>
        </header>
        </>
    )
}

export default Header