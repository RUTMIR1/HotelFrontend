import { JSX } from "react";

interface IMiniCardProps{
    name:string;
    cardOnClick?:()=>void;
}

function MiniCard({name, cardOnClick}:IMiniCardProps):JSX.Element{
    return (
        <>
            <div onClick={cardOnClick} className="outline bg-sky-200 text-center hover:bg-red-500 hover:cursor-pointer">
                {name}
            </div>
        </>
    )
}

export default MiniCard