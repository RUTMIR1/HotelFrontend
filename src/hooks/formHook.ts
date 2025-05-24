import { FormEvent, useState } from "react"
import { Model } from "../model/Model";
import { responseError } from "../types/utilTypes";

interface IFormProps{
    e:FormEvent<HTMLFormElement>;
    currentModel:Model;
    action:(data:Model)=>Promise<responseError>;
    actionEnd:()=>Promise<void>;
}  

export const useForm = ()=>{
    const [errorsInput, setErrorsInput] = useState<Record<string, string>>({});

    const handlerForm = async ({e, currentModel, action, actionEnd }:IFormProps)=>{
        e.preventDefault();
        const result = await action(currentModel);
        if(!(result.status >= 200 && result.status <= 299)){
            const objectError:Record<string, string> = {};
            if(result.data){
                result.data.forEach(el=>{
                    objectError[el.field] = el.message;
                });
            }
            setErrorsInput(objectError);
        }else{
            actionEnd();
        }
    }   
    return { errorsInput, handlerForm };
}