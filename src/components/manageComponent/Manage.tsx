import { JSX, useEffect, useState } from "react";
import Table from "../TableComponent/Table";
import { getAllUsers } from "../../services/userService";
import { useSearchParams } from "react-router-dom";

function Manage():JSX.Element{
    const [list, setList] = useState([{}]);
    const [searchParams] = useSearchParams();
    const query = searchParams.get('type');

    useEffect(()=>{
        getAllUsers().then(
            (response)=>{
                setList(response);
            }
        ).catch(
            (err)=>{
                console.log(err);
            }
        )
    },[]);

    return (
        <>
            <div className="mt-5">
                {
                    query && <Table model={list[0]} list={list} title={query}></Table>
                }
            </div>
        </>
    )
}

export default Manage