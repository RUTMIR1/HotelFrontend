import React, { JSX } from "react";

interface IInputFieldProps{
    label:string;
    options?: string[];
    type?:string;
    name:string;
    onChange:(e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>Promise<void>;
}

function InputField({label, options, type, name, onChange}:IInputFieldProps):JSX.Element{
    return (
        <>
            <div className="w-full md:w-1/2 flex justify-center items-center gap-2 py-2">
                <label htmlFor={name} className='min-w-[50%] text-center'>{label}</label>
                {
                    options?
                    <select onChange={onChange} name={name} id={name} className="outline text-black w-[50%] bg-white">
                        <option value="">All</option>
                        {options.map(el=><option key={el} value={el}>{el}</option>)}
                    </select>:
                    <input onChange={onChange} id={name} name={name} type={type} className="outline focus:outline-sky-500 w-[50%]" />    
                }
            </div>
        </>
    )
}

export default InputField