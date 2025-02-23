import { JSX, useEffect, useRef } from "react";
import './Home.css'
import Card from "../cardComponent/Card";
function Home():JSX.Element{
    const elementRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(()=>{
        const observer = new IntersectionObserver(
            ([entries])=>{
                Array(entries).forEach((el) => {
                    //if(Number(el.target.getAttribute('data-index')) == index){
                        if(el.isIntersecting){
                            el.target.classList.add('show-card');
                        }
                    //}
                });
            },{
                root: null,
                threshold:0.5
            }
        )
        elementRef.current.forEach((el)=>{
           if(el) observer.observe(el);
        })
    });

    return(
        <>
            <figure className="relative font-black text-center">
                <img className="w-full img-height" src="home.jpg" alt="home" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <h2 className="tittle font-black text-9xl max-lg:text-6xl">HOTEL SYSTEM</h2>
                    <h2 className="subtittle font-black text-4xl max-lg:text-2xl">Rest and comfort in every corner. Your home away from home</h2>
                </div>
            </figure>
            <section className="cards mt-50 text-black">
                <div data-index="0" ref={(el)=>{elementRef.current.push(el)}} className="card mt-50">
                    <Card tittle="this is a card" text="card!!!" img="room1.jpg"></Card>
                </div>
                <div data-index="1" ref={(el)=>{elementRef.current.push(el)}} className="card mt-50">
                    <Card tittle="this is a card" text="card!!!" img="room1.jpg" isLeft={false}></Card>
                </div>
                <div data-index="2" ref={(el)=>{elementRef.current.push(el)}} className="card mt-50">
                    <Card tittle="this is a card" text="card!!!" img="room1.jpg"></Card>
                </div>
                <div data-index="3" ref={(el)=>{elementRef.current.push(el)}} className="card mt-50">
                    <Card tittle="this is a card" text="card!!!" img="room1.jpg" isLeft={false}></Card>
                </div>
            </section>
        </>
    )
}

export default Home