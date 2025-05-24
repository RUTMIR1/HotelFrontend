import { JSX} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Table from "../TableComponent/Table";
import { statesReservation } from "../../model/Reservation";
import InputField from "../inputFieldComponent/InputField";
import { UseFilterReservation } from "../../hooks/filterReservation";

function ReserveManage():JSX.Element{

    const {list, currentList, onDelete, handlerFilters} = UseFilterReservation();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('type');

    const navigate = useNavigate();
    

    return (
        <>
            <div>
            <div className="mt-5 p-5 outline flex flex-wrap">
                <InputField label="Code: " type="text" name="code" onChange={handlerFilters}/>
                <InputField label="State: " options={statesReservation} name="state" onChange={handlerFilters}/>
                <InputField label="from reservation start: " type="date" name="from-reservation-start" onChange={handlerFilters}/>
                <InputField label="to reservation start: " type="date" name="to-reservation-start" onChange={handlerFilters}/>
                <InputField label="from reservation end: " type="date" name="from-reservation-end" onChange={handlerFilters}/>
                <InputField label="to reservation end: " type="date" name="to-reservation-end" onChange={handlerFilters}/>
                <InputField label="to reservation end: " type="date" name="to-reservation-end" onChange={handlerFilters}/>
                <InputField label="Amount Min: " type="number" name="amount-min" onChange={handlerFilters}/>
                <InputField label="Amount Max: " type="number" name="amount-max" onChange={handlerFilters}/>
                <InputField label="Username: " type="text" name="username" onChange={handlerFilters}/>
                <InputField label="Room Name: " type="text" name="room" onChange={handlerFilters}/>
            </div>
            <div>
                {
                    query && <Table model={list[0]} list={currentList} title={query}
                    onDelete={onDelete}
                    onUpdate={(({id, data})=>{
                        navigate(`/profile/manage/reservation/form?action=Update`, {state:{
                            id, data}})
                    })} onAdd={()=>navigate(`/profile/manage/reservation/form?action=Create`)}></Table>
                }
            </div>
        </div>
        </>
    )
}

export default ReserveManage