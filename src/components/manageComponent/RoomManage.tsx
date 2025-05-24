import { JSX} from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Table from '../TableComponent/Table';
import { statesRoom } from '../../model/Room';
import useCategories from '../../hooks/category';
import InputField from '../inputFieldComponent/InputField';
import { UseFilterRoom } from '../../hooks/filterRoom';

const RoomManage =():JSX.Element => {
    const {list, currentList, onDelete, handlerFilters} = UseFilterRoom();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('type');
    const {categories} = useCategories();

    const navigate = useNavigate();
    
    return (
        <div>
            <div className="mt-5 p-5 outline flex flex-wrap">
                <InputField label='Name: ' type='text' name='name' onChange={handlerFilters}></InputField>
                <InputField label='State: ' options={statesRoom} name='state' onChange={handlerFilters}></InputField>
                <InputField label='Category: ' options={categories.map(el=>el.name)} type='text' name='category' onChange={handlerFilters}></InputField>
                <InputField label='Price Min: ' type='number' name='price-min' onChange={handlerFilters}></InputField>
                <InputField label='Price Max: ' type='number' name='price-max' onChange={handlerFilters}></InputField>
            </div>
            <div>
                {
                    query && <Table model={list[0]} list={currentList} title={query} onDelete={onDelete} onUpdate={(({id, data})=>{
                        navigate(`/profile/manage/room/form?action=Update`, {state:{
                            id, data}})
                    })} onAdd={()=>navigate(`/profile/manage/room/form?action=Create`)}></Table>
                }
            </div>
        </div>
    );
};

export default RoomManage;