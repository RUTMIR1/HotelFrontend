import { FormEvent, useState } from "react"
import { UserType, userValidation } from "../schemas/User";
import { fieldsList } from "../utils/utils";

export const useUserForm = ()=>{
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handlerForm = async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user:UserType = {
            name: formData.get('name') as string,
            last_name: formData.get('last_name') as string,
            age: parseInt(formData.get('age') as string),
            dni: formData.get('dni') as string,
            username: formData.get('username') as string,
            password: formData.get('password') as string,
            email: formData.get('email') as string,
            phone_number: formData.get('phone_number') as string,
            address:{
                country: formData.get('country') as string,
                province: formData.get('province') as string,
                city: formData.get('city') as string,
                house_number:parseInt(formData.get('house_number') as string),
                floor: parseInt(formData.get('floor') as string),
            },
            rol: {
                id: formData.get('rol') as string
            }
        }
        const result = await userValidation(user);
        if(!result.success){
            const fieldsErrors = fieldsList(result.error);
            const objectError:Record<string,string> = {};
            fieldsErrors.forEach(el=>{
                const path:string = el.field;
                objectError[path] = el.message;
            });
            setErrors(objectError);
        }
    }
    return {errors, handlerForm}
}