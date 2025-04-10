import { Model } from "./model";
import { User } from "./user";

export class ModelFactory{
    static createModel({model, data}:{model:string, data:Record<string, string>}):Model | null{
        switch(model){
            case 'user':
                    return new User(data);
            default:
                return null;
        }
    }
}