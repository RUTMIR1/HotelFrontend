import { JSX } from "react"
import { NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react"
import Button from "../buttonComponent/Button"
import './Header.css'


function Header():JSX.Element{

    const navigate = useNavigate();

    const getUserTheme = ():string =>{
        const storedTheme:string | null = window.localStorage.getItem("theme");
        if(storedTheme) return storedTheme;
        return window.matchMedia("(prefers-color-scheme)").matches ? "dark" : "light";
    }
    const [theme, setTheme] = useState(getUserTheme());
    const [isMenuThemeOpen, setIsMenuThemeOpen] = useState(false);
    
    useEffect(():void=>{
        setIsMenuThemeOpen(false);
        const elements:NodeListOf<Element> = window.document.querySelectorAll('[data-theme]');
        elements.forEach((el:Element)=>{
            el.classList.remove('light-theme', 'dark-theme');
            el.classList.add(`${theme}-theme`);
        });
        window.localStorage.setItem('theme',theme);
    }, [theme]);

    return (
        <>
        <header className="light-theme z-999 text-2xl p-3 h-25 flex justify-around items-center gap-2
         text-center sticky top-0 right-0 left-0 font-black" data-theme>
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
                            <li className="border-1 border-stone-500 option" onClick={():void =>setTheme('light')}>Light</li>
                            <li className="border-1 border-stone-500 option" onClick={():void =>setTheme('dark')}>Dark</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <Button children={'Register'} onClick={():void | Promise<void>=> navigate('/register')}></Button>
                </div>
                <div>
                    <Button children={'LogIn'} onClick={():void | Promise<void>=> navigate('/login')}></Button>
                </div>
            </div>
        </header>
        </>
    )
}

export default Header