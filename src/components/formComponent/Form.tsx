import { JSX } from "react";
import { useNavigate } from "react-router-dom";

function Form():JSX.Element{
    
    return (
        <>
            <div className="mt-5 flex justify-center bg-green-500">
                <form className="rounded p-5 form-style max-w-2xl w-full">
                    <h2 className="text-center text-4xl">FORMULARIO</h2>
                    <div className="flex flex-col">
                        <label htmlFor="name">Nombre:</label>
                        <input className="outline" id="name" name="name" type="text" placeholder="NAME"/>
                    </div>
                </form>
            </div>  
        </>
    )
}

export default Form