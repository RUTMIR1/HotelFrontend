import { JSX, useEffect, useState } from "react";
import Table from "../TableComponent/Table";
import { getAllUsers } from "../../services/userService";
import { useNavigate, useSearchParams } from "react-router-dom";
import { modelReducer } from "../../reducers/useModel";
function UserManage():JSX.Element{
    const [list, setList] = useState([{}]);
    const [currentList, setCurrentList] = useState([{}]);
    const [searchParams] = useSearchParams();
    const query = searchParams.get('type');

    const navigate = useNavigate();
    useEffect(()=>{
        getAllUsers().then(
            (response)=>{
                setList(response);
                setCurrentList(response);
            }
        ).catch(
            (err)=>{
                console.log(err);
            }
        )
    },[]);

    return (
        <>
            <div className="mt-5 p-5 outline">
                <label htmlFor="username">Username: </label>
                <input className="outline focus:outline-sky-500" id="username" name="username" onChange={async (e)=>{
                    const newList = await modelReducer({state: list, action:{type:'FILTER', payload: {filter: 'username', match: e.target.value}}});
                    setCurrentList(newList);
                }} type="text" />
            </div>
            <button className="mt-5 w-full h-10 rounded-md border bg-green-400 hover:cursor-pointer hover:bg-green-800" type="button"
            onClick={()=>{navigate('/profile/manage/add')}}>Add</button>
            <div>
                {
                    query && <Table model={list[0]} list={currentList} title={query}></Table>
                }
            </div>
        </>
    )
}

export default UserManage