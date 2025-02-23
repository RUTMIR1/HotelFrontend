import React, { JSX } from "react";
import './Button.css'

export interface IButtonProps{
    children: React.ReactNode;
    onClick?: ()=> void;
}

function Button({children, onClick}:IButtonProps):JSX.Element{
    return (
        <button className='border-4 border-stone-500 p-3 rounded-full w-auto' type='button' onClick={onClick}>
            {children}
        </button>
    )
}

export default Button