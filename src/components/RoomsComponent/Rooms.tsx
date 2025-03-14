import { JSX, useEffect} from "react";
import { UseFilterRoom } from "../../hooks/filterRoom";
import Card from "../cardComponent/Card";

function Rooms():JSX.Element{
    const {rooms, categories, handlerCategoryList} = UseFilterRoom();


    useEffect(()=>{
        console.log(rooms)
    }, [rooms])

    
    return (
        <>
            <div className="min-h-screen">
                <div className="h-20 flex justify-center items-center border-2">
                    <div className="bg-slate-500 p-4 border-2">
                        <label htmlFor="category">Category:</label>
                        <select className="bg-white text-black" onChange={(e)=>handlerCategoryList(e)} name="category" id="category">
                            {
                                categories.map((el):JSX.Element=>{
                                    return (
                                        <>
                                            <option value={el.name}>{el.name}</option>
                                        </> 
                                    ) 
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="flex flex-col">
                {
                    rooms.map((el):JSX.Element=>{
                        return (
                            <>
                                <Card key={el.id} tittle={el.name} text={el.description} img="room1.jpg"></Card>
                            </>
                        )
                    }) 
                }
                </div>
            </div>
        </>
    )
}

export default Rooms