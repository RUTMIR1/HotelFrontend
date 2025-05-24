import { JSX } from "react";
import Table from "../TableComponent/Table";
import { useNavigate, useSearchParams } from "react-router-dom";
import InputField from "../inputFieldComponent/InputField";
import { UseFilterCategory } from "../../hooks/filterCategory";
function CategoryManage():JSX.Element{
    const {list, currentList, onDelete, handlerFilters} = UseFilterCategory()

    const [searchParams] = useSearchParams();
    const query = searchParams.get('type');

    
    const navigate = useNavigate();
    return (
        <>
            <div className="mt-5 p-5 outline flex flex-wrap">
                <InputField label="Name: " name="name" type="text" onChange={handlerFilters} ></InputField>
            </div>
            <div>
                {
                    query && <Table model={list[0]} list={currentList} title={query} onDelete={onDelete} onUpdate={(({id, data})=>{
                        navigate(`/profile/manage/category/form?action=Update`, {state:{
                            id, data}})
                    })} onAdd={()=>navigate(`/profile/manage/category/form?action=Create`)}></Table>
                }
            </div>
        </>
    )
}

export default CategoryManage