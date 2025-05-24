import { JSX, useEffect, useState } from 'react';
import { useForm } from '../../hooks/formHook';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Room, statesRoom } from '../../model/Room';
import { Model } from '../../model/Model';
import { createRoom, updateRoom } from '../../services/roomService';
import Button from '../buttonComponent/Button';
import useCategories from '../../hooks/category';
import MiniCard from '../miniCardComponent/MiniCard';
import { Category } from '../../model/Category';


function RoomForm():JSX.Element{
    const {errorsInput, handlerForm} = useForm();
    const [searchParams] = useSearchParams();
    const actionType = searchParams.get('action') || '';
    const location = useLocation();
    const dataState = location.state;
    const {categories, errorCategories, loadingCategories} = useCategories();
    const [currentRoom, setCurrentRoom] = useState<Room>(Room.empty());

    useEffect(()=>{
        if(actionType === 'Update'){
            setCurrentRoom(dataState.data);
        }else{
            setCurrentRoom(Room.empty());
        }
    },[actionType, dataState])

    const navigate = useNavigate();

    const action = async (data:Model)=>{
        if(actionType === 'Create'){
            try{
                const result = await createRoom(data as Room);
                return result;
            }catch(err){
                return err;
            }
        }else{
            try{
                const result = await updateRoom(dataState.id, data as Room);
                return result;
            }catch(err){
                return err;
            }
        }
    }

    const actionEnd = async ()=>{
        navigate(`/profile/manage/room?type=room`)
    }

    const handleInput = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
      ) => {
        const { name, value } = e.target;
        const parsedValue = name === 'price' ? parseFloat(value) : value;
        setCurrentRoom({
          ...currentRoom,
          [name]: parsedValue,
        })
      };

    const handlerDeleteCategory = (catDelete:Category)=>{
        const newRoom = {
            ...currentRoom
        };
        newRoom.categories = newRoom.categories.filter(category=>category.id!==catDelete.id);
        setCurrentRoom(newRoom);
    }


    const handlerAddCategory = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)=>{
        const newRoom = {
            ...currentRoom
        }
        const newCategory = categories.find(el=>el.id === e.target.value);
        if(newCategory && !newRoom.categories.some(el=>el.id === e.target.value)){
            newRoom.categories.push(newCategory);
            setCurrentRoom(newRoom);
        }
    }

    return (
        <>
            <div className="w-full flex justify-center items-center text-black">
            <div className="mt-5 w-full max-w-2xl">
                <form onSubmit={(e)=>handlerForm({e,currentModel:currentRoom as Model,action, actionEnd})} className="rounded p-5 form-style">
                {currentRoom && (<><h2 className="text-center text-4xl bg-sky-600 outline">Room</h2>
                    <div className="flex flex-col mt-5">
                        <label className="text-xl" htmlFor="name">Name</label>
                        <input onChange={handleInput} defaultValue={currentRoom?currentRoom.name:''} className="outline" id="name" name="name" type="text" placeholder="Room1"/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['name'] &&  `${errorsInput.name}`}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label className="text-xl" htmlFor="price">Price</label>
                        <input onChange={handleInput} defaultValue={currentRoom?currentRoom.price:0} className="outline" id="price" name="price" type="number"/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['price'] &&  `${errorsInput.price}`}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label className="text-xl" htmlFor="description">Description</label>
                        <textarea
                        onChange={handleInput}
                        defaultValue={currentRoom?currentRoom.description:0}
                        name="description"
                        id="description"
                        maxLength={300}
                        className="h-32 p-3 outline rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 placeholder-gray-400 resize-none"
                        placeholder="Write a description..."
                        ></textarea>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['description'] &&  `${errorsInput.description}`}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label className="text-xl" htmlFor="image_url">Image_url</label>
                        <input onChange={handleInput} defaultValue={currentRoom?currentRoom.image_url:0} className="outline" id="image_url" name="image_url" type="text" placeholder="https://mylink.com.ar"/>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['image_url'] &&  `${errorsInput.image_url}`}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label className="text-xl" htmlFor="state">state</label>
                        <select value={currentRoom.state} onChange={handleInput} className='outline text-black' name="state" id="state">
                            <option value="">Select..</option>
                            {
                                statesRoom.map(el=> <option value={el}>{el}</option>)
                            }
                        </select>
                    </div>
                    <div className="text-red-500">
                        {errorsInput['state'] &&  `${errorsInput.state}`}
                    </div>
                    {
                        loadingCategories? <h2 className='text-sky-500 mt-5'>LOADING...</h2>:
                        (<>{
                            errorCategories || (
                            <>
                            <div className="flex flex-col mt-5">
                                <label htmlFor="categoryID">Categories</label>
                                <select className="outline" onChange={handlerAddCategory} name="categoryID" id="categoryID">
                                    <option value=''>Select...</option>
                                    {

                                        categories.map((el, index)=>{
                                            return <option key={index} value={el.id}>{el.name}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="text-red-500">
                                {errorsInput['categories'] && `${errorsInput.categories}`}
                            </div>
                            </>
                            )
                        }</>)

                    }
                    <div className='mt-2 flex flex-wrap gap-2'>
                    {
                        currentRoom.categories.map(el => (
                        <div className='w-full sm:w-auto sm:min-w-[150px]'>
                            <MiniCard name={el.name} cardOnClick={()=>handlerDeleteCategory(el)}/>
                        </div>
                        ))
                    }
                    </div>
                    <div className="flex flex-col mt-5">
                        <Button type="submit">{actionType}</Button>
                    </div>
                    </>)}
                </form>
            </div>
            </div>
        </>
    );
};

export default RoomForm;