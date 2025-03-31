import { FormEvent, useState } from "react";
import { UserType} from "../schemas/User";
import { AddressType } from "../schemas/Address";
import { register } from "../services/autoService";
import { useNavigate } from "react-router-dom";

export function useUser(){
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name:{data:'', status:false},
        last_name:{data:'', status:false},
        age:{data:'', status:false},
        username:{data:'', status:false},
        password:{data:'', status:false},
        email:{data:'', status:false},
        phone_number:{data:'', status:false},
        country:{data:'', status:false},
        province:{data:'', status:false},
        city:{data:'', status:false},
        house_number:{data:'', status:false},
        floor:{data:'', status:false},
        ok:{data:'', status:false}
    })
    const handlerForm = async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if(formData.get('ok') === 'true'){
            const address:AddressType = {
                country:formData.get('country') as string,
                province:formData.get('province') as string,
                city:formData.get('city') as string,
                house_number:parseInt(formData.get('house-number') as string),
                floor: parseInt(formData.get('floor') as string)
            }
            const userObject:UserType = {
                name: formData.get('name') as string,
                last_name: formData.get('last-name') as string,
                age: parseInt(formData.get('age') as string),
                username: formData.get('username') as string,
                password: formData.get('password') as string,
                email: formData.get('email') as string,
                phone_number: formData.get('phone') as string,
                address:address,
                rol:{id:'693b0754-e1e7-11ef-8f63-0242ac130002', name:'user'}
            }
            const response = await register(userObject);
            if(!(response.status >= 200 && response.status <= 299)){
            setUser((prevUser)=>{
                const newUser = {...prevUser};
                    for(const key in newUser){
                        newUser[key as keyof typeof newUser].status = false;
                        for(const el of response.data){
                            if(el.field === key){
                                newUser[key as keyof typeof newUser].status = true;
                                newUser[key as keyof typeof newUser].data = el.message;
                            }
                        }
                    }
                    return newUser;
                });
            }else{
                navigate('/login');
            }
        }else{
            setUser((prevUser)=>{
                const newUser = {...prevUser};
                newUser.ok.status = true;
                newUser.ok.data = `you must accepted our terms and conditions`;
                return newUser;
            })
        }
    }
    return {user, handlerForm}
}