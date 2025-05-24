import { JSX } from "react";
import Button from "../buttonComponent/Button";

interface IRoomCardProps{
    title:string;
    text:string;
    price:number;
    img:string;
    nameAction:string;
    action: ()=>void;
}

function RoomCard({title, text, price, img, nameAction, action}:IRoomCardProps):JSX.Element{
    return (
        <>
            <div className="w-full flex flex-col justify-center items-center transition duration-300 ease-in-out hover:scale-120">
                <div className="p-5">
                    <img src={img} alt={img}/>
                </div>
                <h2 className="text-3xl m-2">{title}</h2>
                <div>
                    {text}
                </div>
                <div className="text-lg">
                    ${price} x 30 days
                </div>
                <div className="m-5 w-full h-10">
                    <Button onClick={action} type='button'>{nameAction}</Button>
                </div>
            </div>
        </>
    )
}

export default RoomCard;