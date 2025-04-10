import { FormEvent, useState } from "react"
import { ModelFactory } from "../model/ModelFactory";
import { SafeParseReturnType } from "zod";
import { fieldsList } from "../utils/utils";
import { Model } from "../model/model";

interface IFormProps{
    e:FormEvent<HTMLFormElement>;
    model:string;
    action:(data:Model)=>Promise<void>;
}  

export const useForm = ()=>{
    const [errorsInput, setErrorsInput] = useState<Record<string, string>>({});
    const [formError, setFormError] = useState<string>();

    const handlerForm = async ({e, model, action }:IFormProps)=>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data:Record<string, string> = {};
        formData.forEach((value, key)=>{
            data[key] = value as string;
        })
        console.log("esta es la data!! ", data);
        const currentModel = ModelFactory.createModel({model,data});
        if(currentModel){
            const result = await currentModel.validateModel(currentModel) as SafeParseReturnType<unknown, unknown>;
            if(!result.success){
                const fieldsErrors = fieldsList(result.error);
                const objectError:Record<string, string> = {};
                fieldsErrors.forEach(el=>{
                    objectError[el.field] = el.message;
                });
                setErrorsInput(objectError);
            }else{
                try{
                    console.log("esto es current model", currentModel);
                    await action(currentModel);
                }catch(error){
                    setFormError((error as Error).message);
                }
            }
        }else{
            setFormError('Error Model in Form')
        }
    }   

    return { errorsInput, formError, handlerForm };
}