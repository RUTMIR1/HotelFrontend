import { JSX } from "react";

interface IModalTextProps{
    title:string;
    text:string;
    setModal:React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalText({title, text, setModal}:IModalTextProps):JSX.Element{
    return (
        <>
            <div className="flex flex-col fixed inset-0 justify-center items-center z-9999 text-center backdrop-blur">
                <div className="max-w-lg h-8/10 bg-slate-500 rounded-sm">
                    <div className="font-black text-2xl h-1/10 m-5 bg-[#43221150]">
                        <h2>{title}</h2>
                    </div>
                    <div className="h-7/10 m-5 bg-[#43221150] overflow-x-auto">
                        {text}
                    </div>
                    <div className="h-1/10 m-5 bg-[#43221150]">
                        <button onClick={()=>setModal(false)} className="font-black min-w-xs rounded-md mt-5 border-2" type="button">CLOSE</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalText