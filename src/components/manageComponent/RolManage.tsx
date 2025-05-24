import { JSX } from "react";
import Table from "../TableComponent/Table";
import { useNavigate, useSearchParams } from "react-router-dom";
import InputField from "../inputFieldComponent/InputField";
import { UseFilterRol } from "../../hooks/filterRol";
function RolManage():JSX.Element{
    const {list, currentList, onDelete, handlerFilters} = UseFilterRol();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('type');

    const navigate = useNavigate();

    return (
        <>
            <div className="mt-5 p-5 outline">
                <InputField label="Name: " name="name" type="text" onChange={handlerFilters}></InputField>      
            </div>
            <div>
                {
                    query && <Table model={list[0]} list={currentList} title={query} onDelete={onDelete} onUpdate={(({id, data})=>{
                        navigate(`/profile/manage/rol/form?action=Update`, {state:{
                            id, data}})
                    })} onAdd={()=>navigate(`/profile/manage/rol/form?action=Create`)}></Table>
                }
            </div>
        </>
    )
}

export default RolManage