export class Address{
    country:string; 
    province:string;
    city:string;
    house_number:number;
    floor:number;
    constructor(country:string, province:string, city:string,house_number:number, floor:number){
        this.country = country;
        this.province = province;
        this.city = city;
        this.house_number = house_number;
        this.floor = floor;
    }
}