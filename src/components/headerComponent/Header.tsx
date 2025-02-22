import { JSX } from "react"
import { useState, useEffect } from "react"
import Button from "../buttonComponent/Button"
import './Header.css'


function Header():JSX.Element{
    const [theme, setTheme] = useState('light');

    useEffect(():void=>{
        const elements = window.document.querySelectorAll('[data-theme]');
        elements.forEach((el)=>{
            el.classList.toggle('light-theme');
            el.classList.toggle('dark-theme');
        })
        console.log(elements);
    }, [theme])
    

    const changeTheme = ():void=>{

        if(theme === 'light'){
            setTheme('dark');
        };
        if(theme === 'dark'){
            setTheme('light');
        };
    } 

    return (
        <header className="light-theme z-999 text-2xl p-3 h-25 flex justify-around items-center gap-2
         text-center sticky top-0 right-0 left-0" data-theme>
            <figure className="flex items-center w-25">
                <img className="" src="icon.png" alt="icon"/>
            </figure>
            <ul className="flex flex-auto items-center justify-around max-lg:hidden">
                <li>
                    Home
                </li>
                <li>
                    Services
                </li>   
                <li>
                    Rooms
                </li>
                <li>
                    Contact
                </li>
                <li>
                    About Hotel
                </li>
            </ul>
            <div>
                <Button children={'Profile'} onClick={():void=> alert('This is a button')}></Button>
                <Button children={theme} onClick={changeTheme} id="btn-mode"></Button>
            </div>
        </header>
    )
}

export default Header