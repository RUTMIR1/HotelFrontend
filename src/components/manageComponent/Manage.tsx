import { JSX, useEffect, useState } from "react";
import Table from "../TableComponent/Table";
import { getAllUsers } from "../../services/userService";

function Manage():JSX.Element{
    const [list, setList] = useState([{}]);

    useEffect(()=>{
        getAllUsers().then(
            (response)=>{
                console.log("se ejecuta!!")
                setList(response);
            }
        ).catch(
            (err)=>{
                console.log("se ejecuta err!!")
                console.log(err);
            }
        )
    },[]);

    return (
        <>
           <Table model={list[0]} list={list}></Table>
        </>
    )
}

export default Manage