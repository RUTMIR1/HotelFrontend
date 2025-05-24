import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "../../hooks/formHook";
import Button from "../buttonComponent/Button";
import { JSX, useEffect, useState } from "react";
import { Model } from "../../model/Model";
import { Rol } from "../../model/Rol";
import { createRol, updateRol } from "../../services/rolService";

function RolForm():JSX.Element{
    const {errorsInput, handlerForm} = useForm();
    const [searchParams] = useSearchParams();
    const actionType = searchParams.get('action') || '';
    const location = useLocation();
    const dataState = location.state;
    const [currentRol, setCurrentRol] = useState<Rol>();

    useEffect(()=>{
        if(actionType === 'Update'){
            setCurrentRol(dataState.data);
        }else{
            setCurrentRol(Rol.empty());
        }
    },[actionType, dataState])

    const navigate = useNavigate();

    const action = async (data:Model)=>{
        if(actionType === 'Create'){
            try{
                const result = await createRol(data as Rol)
                return result;
            }catch(err){
                return err;
            }
        }else{
            try{
                const result = await updateRol(dataState.id, data as Rol);
                return result;
            }catch(err){
                return err;
            }
        }
    }

    const actionEnd = async ()=>{
        navigate(`/profile/manage/rol?type=rol`)
    }

    const handleInput = async (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        const {name, value}=e.target;
        if(currentRol){
            setCurrentRol({
                ...currentRol,
                [name]:value
            })
        }
    }

    return (
        <>
            <div className="w-full flex justify-center items-center text-black">
             <div className="mt-5 w-full max-w-2xl">
                {
                currentRol && 
                <form onSubmit={(e)=>handlerForm({e,currentModel:currentRol as Model,action, actionEnd})} className="rounded p-5 form-style">
                <h2 className="text-center text-4xl bg-sky-600 outline">Rol</h2>
                    <div className="flex flex-col mt-5">
                        <label className="text-xl" htmlFor="name">Name</label>
                        <input onChange={handleInput} defaultValue={currentRol?currentRol.name:''} className="outline" id="name" name="name" type="text" placeholder="Mark"/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['name'] &&  `${errorsInput.name}`}
                    </div>
                    <div className="flex flex-col mt-5 ">
                        <Button type="submit">{actionType}</Button>
                    </div>
                </form>
                }
             </div>
            </div>
        </>
    )
}

export default RolForm