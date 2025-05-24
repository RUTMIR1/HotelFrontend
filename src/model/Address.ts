import { Model } from "./Model";

export class Address extends Model{
    country:string; 
    province:string;
    city:string;
    house_number:number;
    floor:number;
    constructor(id:string, country:string, province:string, city:string,house_number:number, floor:number){
        super(id);
        this.country = country;
        this.province = province;
        this.city = city;
        this.house_number = house_number;
        this.floor = floor;
    }
}