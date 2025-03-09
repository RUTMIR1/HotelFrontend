import { useEffect, useRef } from "react";


export function useObserverElements(){
    const elementRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(()=>{
        const observer = new IntersectionObserver(
            (entries)=>{
                  entries.forEach((el) => {
                    if(el.isIntersecting){
                       el.target.classList.add('show-card');
                       observer.unobserve(el.target);
                     }
                }); 
            },{
                root: null,
                threshold:0.5
            }
        )
        elementRef.current.forEach((el)=>{
           if(el) observer.observe(el);
        })

        return () => observer.disconnect();
    },[]);

    return {elementRef}
}