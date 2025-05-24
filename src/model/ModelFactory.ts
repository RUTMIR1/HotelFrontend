import { Model } from "./Model";
import { Room } from "./Room";
import { User } from "./User";

export class ModelFactory{
    static createModel({model, data}:{model:string, data:Record<string, unknown>}):Model | null{
        switch(model){
            case 'user':
                    return new User(data);
            case 'room':
                    return  new Room(data);
            default:
                return null;
        }
    }
}