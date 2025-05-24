import { Model } from "./Model";

export class Category extends Model{
    name:string;

    constructor(id:string, name:string){
        super(id);
        this.id = id;
        this.name = name;
    }

    static empty(){
        return new Category('','');
    }
}