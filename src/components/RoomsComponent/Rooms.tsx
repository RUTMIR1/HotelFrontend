import { JSX} from "react";
import { UseFilterRoom } from "../../hooks/filterRoom";
import RoomCard from "../roomCardComponent/RoomCard";
import { useNavigate } from "react-router-dom";
import useCategories from "../../hooks/category";
import InputField from "../inputFieldComponent/InputField";

function Rooms():JSX.Element{
    const {currentList, handlerFilters} = UseFilterRoom('active');
    const {categories} = useCategories();
    const navigate = useNavigate();
    
    return (
        <>
            <div className="min-h-screen">
                <div className="mt-5 p-5 outline flex flex-wrap">
                    <InputField label='Name: ' type='text' name='name' onChange={handlerFilters}></InputField>
                    <InputField label='Category: ' options={categories.map(el=>el.name)} type='text' name='category' onChange={handlerFilters}></InputField>
                    <InputField label='Price Min: ' type='number' name='price-min' onChange={handlerFilters}></InputField>
                    <InputField label='Price Max: ' type='number' name='price-max' onChange={handlerFilters}></InputField>
                </div>
                <div className="grid grid-cols-3 gap-12 m-5">
                {
                    currentList.map((el):JSX.Element=>{
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