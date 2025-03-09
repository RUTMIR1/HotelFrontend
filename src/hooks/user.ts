import { FormEvent, useRef } from "react";
import { UserType, userValidation } from "../schemas/User";
import { AddressType } from "../schemas/Address";

export function useUser(){
    const name = useRef({name:'', status:false});
    const lastname = useRef({lastname:'', status:false});
    const age = useRef({age:0, status:false});
    const username = useRef({username:'', status:false});
    const password = useRef({password:'', status:false});
    const email = useRef({email:'', status:false});
    const phoneNumber= useRef({phone_number:'', status:false});
    const country = useRef({country:'', status:false});
    const province = useRef({province:'', status:false});
    const city = useRef({city:'', status:false});
    const houseNumber = useRef({house_number:0, status:false});
    const floor = useRef({floor:0, status:false});
    
    const handlerForm = async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault(); 
        const formData = new FormData(e.currentTarget);
        const address:AddressType = {
            country:formData.get('country') as string,
            province:formData.get('province') as string,
            city:formData.get('city') as string,
            house_number:parseInt(formData.get('house-number') as string),
            floor: parseInt(formData.get('floor') as string)
        }
        const user:UserType = {
            name: formData.get('name') as string,
            last_name: formData.get('last-name') as string,
            age: parseInt(formData.get('age') as string),
            username: formData.get('username') as string,
            password: formData.get('password') as string,
            email: formData.get('email') as string,
            phone_number: formData.get('phone') as string,
            address:address,
            rol:{id:'693b0754-e1e7-11ef-8f63-0242ac130002'}
        }
        console.log(user);
        const result = await userValidation(user);
        console.log(result);
    }

    
    return {name, lastname, age, username, password, email, phoneNumber, country, province, city,
        houseNumber, floor, handlerForm}
}