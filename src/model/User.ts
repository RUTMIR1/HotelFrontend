import { userValidation } from "../schemas/User.ts";
import { Address } from "./Address";
import { Model } from "./model.ts";
import { Rol } from "./Rol";

export class User extends Model{
    name: string;
    last_name: string;
    age: number;
    dni: string;
    email:string;
    username:string;
    password: string;
    phone_number:string;
    address:Address;
    rol:Rol;
    constructor({name, last_name, age, dni, email, username,
        password, phone_number, country, province, city, 
    house_number, floor, rolID, rolName}:Record<string, string | number>){
        super();
        this.name = name as string;
        this.last_name = last_name as string;
        this.age = parseInt(age as string);
        this.dni = dni as string;
        this.email = email as string;
        this.username = username as string;
        this.password = password as string;
        this.phone_number = phone_number as string;
        this.address = {
            country: country as string,
            province: province as string,
            city: city as string,
            house_number: parseInt(house_number as string),
            floor: parseInt(floor as string)
        }
        this.rol = {
            id: rolID as string,
            name: rolName as string,
        }
    }

    async validateModel(data: unknown){
        console.log(data);
        return await userValidation(data);
    }
}