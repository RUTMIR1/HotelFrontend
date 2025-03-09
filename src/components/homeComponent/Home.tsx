import { JSX } from "react";
import './Home.css'
import Card from "../cardComponent/Card";
import { homeCards } from "../../utils/utils";
import { useObserverElements } from "../../hooks/observerElements";
function Home():JSX.Element{
    const { elementRef } = useObserverElements();
    return(
        <>
            <figure className="relative font-black text-center">
                <img className="w-full img-height" src="home.jpg" alt="home" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <h2 className="tittle font-black text-9xl max-lg:text-6xl">HOTEL SYSTEM</h2>
                    <h2 className="subtittle font-black text-4xl max-lg:text-2xl">Rest and comfort in every corner. Your home away from home</h2>
                </div>
            </figure>
            <section className="cards text-black size-full mt-50">
                {
                    homeCards.map((card,index)=>(
                    <div key={index} data-index={index} ref={(el)=>{elementRef.current[index]=el}} className="card mt-50">
                        <Card tittle={card.tittle} text={card.text} img={card.img} isLeft={card.isLeft}></Card>
                    </div>
                ))}
            </section>
        </>
    )
}

export default Home