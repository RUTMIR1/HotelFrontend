import React, { JSX } from "react";
import './Button.css'

export interface IButtonProps{
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    onClick?: ()=> void;
    isDisabled?: boolean;
}

function Button({children, onClick, type="button", isDisabled=false}:IButtonProps):JSX.Element{
    return (
        <button className='btn outline-3 outline-stone-500 p-2 rounded-full w-full hover:outline-sky-50' type={type} onClick={onClick}
        disabled={isDisabled}>
            {children}
        </button>
    )
}

export default Button