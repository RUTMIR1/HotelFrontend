import { JSX } from "react";
import './Card.css';

interface ICardProps{
    tittle?:string;
    text?:string;
    img?:string;
    isLeft?:boolean
}

function Card({tittle, text, img, isLeft=true}:ICardProps):JSX.Element{
    return (
        <>
            <article className="card-structure size-full text-center rounded-md">
                <div>
                    <h2>{tittle}</h2>
                </div>
                { isLeft? (
                    <>
                    <div className="border-4 rounded-md">
                    <figure className="size-full">
                        <img className="size-full" src={img} alt={tittle} />
                    </figure>
                    </div>
                    <div>
                        <p>{text}</p>
                    </div>    
                    </>):(
                    <>
                        <div>
                            <p>{text}</p>
                        </div>
                        <div className="border-4 rounded-md">
                            <figure className="size-full">
                                <img className="size-full" src={img} alt={tittle} />
                            </figure>
                        </div>
                    </>)}
            </article>
        </>
    )
}

export default Card;