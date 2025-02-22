import React, { JSX } from "react";
import './Button.css'

export interface IButtonProps{
    children: React.ReactNode;
    onClick?: ()=> void;
    id?:string;
}

function Button({children, onClick, id}:IButtonProps):JSX.Element{
    return (
        <button id={id} className='border-4 border-stone-500 p-3 w-auto rounded-full' type='button' onClick={onClick}>
            {children}
        </button>
    )
}

export default Button