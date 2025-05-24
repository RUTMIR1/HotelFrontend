import { JSX } from "react";
import Table from "../TableComponent/Table";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRol } from "../../hooks/rol";
import InputField from "../inputFieldComponent/InputField";
import { UseFilterUser } from "../../hooks/filterUser";
function UserManage():JSX.Element{
    const {list, currentList, onDelete, handlerFilters} = UseFilterUser();

    const [searchParams] = useSearchParams();
    const query = searchParams.get('type');
    const {rols} = useRol();

    const navigate = useNavigate();

    return (
        <>
            <div className="mt-5 p-5 outline flex flex-wrap">
                <InputField label='Username: ' type='text' name='username' onChange={handlerFilters}></InputField>
                <InputField label='Email: ' type='text' name='email' onChange={handlerFilters}></InputField>
                <InputField label='DNI: ' type='text' name='dni' onChange={handlerFilters}></InputField>
                <InputField label='Rol:' options={rols.map(el=>el.name)} name='rol' onChange={handlerFilters}></InputField>
                <InputField label='Country:' type='text' name='country' onChange={handlerFilters}></InputField>    
            </div>
            <div>
                {
                    query && <Table model={list[0]} list={currentList} title={query} onDelete={onDelete} onUpdate={(({id, data})=>{
                        navigate(`/profile/manage/user/form?action=Update`, {state:{
                            id, data}})
                    })} onAdd={()=>navigate(`/profile/manage/user/form?action=Create`)}></Table>
                }
            </div>
        </>
    )
}

export default UserManage