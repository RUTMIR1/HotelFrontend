import { Model } from "./Model";
import { Room } from "./Room";
import { User } from "./User";

export const statesReservation = ['current','finalized', 'canceled'];

export class Reservation extends Model{
    reservation_date_start: string;
    reservation_date_end: string;
    check_in: string;
    check_out: string;
    code: string;
    amount: number;
    state: string;
    days:number;
    user: User;
    room: Room;

    constructor(id:string, reservation_date_start:string, reservation_date_end:string, check_in:string, check_out:string, code:string, amount:number, state:string, days:number, user:User, room:Room){
        super(id);
        this.reservation_date_start = reservation_date_start;
        this.reservation_date_end = reservation_date_end;
        this.check_in = check_in;
        this.check_out = check_out;
        this.code = code;
        this.amount = parseFloat((amount as unknown) as string);
        this.state = state;
        this.days = days;
        this.user = user;
        this.room = room;
    }

    static empty(): Reservation{
        const nowDate = new Date().toISOString().split('T')[0];
        return new Reservation('',nowDate, nowDate, nowDate, nowDate, '', 0, '', 0, User.empty(), Room.empty());
    }

    static createReservationForClient(days:number, amount:number, user:User, room:Room):Reservation{
        const nowDate = new Date().toISOString().split('T')[0];
        const endDate = new Date(new Date().getTime() + (1000*60*60*24*days)).toISOString().split('T')[0];
        return new Reservation('', nowDate, endDate, nowDate, nowDate, '', amount, statesReservation[0], days, user, room);
    }
}   