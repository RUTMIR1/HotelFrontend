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
            <article className="card-structure size-full text-center">
                    <div>
                        <h2>{tittle}</h2>
                    </div>
                { isLeft? (
                    <>
                    <div>
                    <figure className="size-full">
                        <img className="img-card" src={img} alt={tittle} />
                    </figure>
                    </div>
                    <div className="flex items-center p-5">
                        <p>{text}</p>
                    </div>    
                    </>):(
                    <>
                        <div className="flex items-center p-5">
                            <p>{text}</p>
                        </div>
                        <div>
                            <figure className="size-full">
                                <img className="img-card" src={img} alt={tittle} />
                            </figure>
                        </div>
                    </>)}
            </article>
        </>
    )
}

export default Card;