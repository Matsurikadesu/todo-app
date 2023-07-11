import { useContext } from "react";
import DataContext from "../../context";
import { useFormContext } from "react-hook-form";

const Select = ({handleStatusChange = () => {}, currentColumn}) => {
    const { currentBoard } = useContext(DataContext);
    const { register } =  useFormContext();
    
    const options = currentBoard.columns.map((column, index) => <option defaultValue={column.name} key={index}>{column.name}</option>)

    return(
        <select id="select" onChange={handleStatusChange} className='card__status-select' {...register('status')} defaultValue={currentColumn}>
            {options}
        </select>
    )
}

export default Select;