import { JSX } from "react";

export interface IListProps{
    children:React.ReactNode[];
    name: string;
    id: string;
}

function List({children, name, id}:IListProps):JSX.Element{

    return (
        <>
            <label htmlFor={id}>''</label>
            <select name={name} id={id}>
            {children.map((el, index) => (
                typeof el === "string" || typeof el === "number" ? (
                    <option key={index} value={el}>{el}</option>
                        ) : null))
            }
            </select>
        </>
    );
}

export default List;