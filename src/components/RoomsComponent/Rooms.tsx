import { JSX, useEffect} from "react";
import { UseFilterRoom } from "../../hooks/filterRoom";
import RoomCard from "../roomCardComponent/RoomCard";
import { useNavigate } from "react-router-dom";

function Rooms():JSX.Element{
    const {rooms, categories, handlerCategoryList} = UseFilterRoom();

    const navigate = useNavigate();


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
                <div className="grid grid-cols-3 gap-12 m-5">
                {
                    rooms.map((el):JSX.Element=>{
                        return (
                            <>
                                <RoomCard key={el.id} title={el.name} text={el.description} price={el.price*30} img={'room1.jpg'}
                                 nameAction="View" action={()=>navigate(`/rooms/room/${el.id}`)}></RoomCard>
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