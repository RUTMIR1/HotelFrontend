import { Category } from "./Category";
import { Model } from "./Model";


export const statesRoom = ['active', 'inactive', 'reserved'];

export class Room extends Model{
    name: string;
    price: number;
    description: string;
    image_url: string;
    state: string;
    categories: Category[];


    constructor({id, name, price, description, image_url,
        state, categories}:Record<string, unknown>){
        super(id as string);
        this.name = name as string;
        this.description = description as string;
        this.price = parseFloat((price as unknown) as string);
        this.image_url = image_url as string;
        this.state = state as string;
        this.categories = categories as Category[];
    }

    static empty(): Room{
        return new Room({id: '', name: '', price: 0, description: '', image_url: '', state: '', categories: []});
    }
}