import { useContext } from "react";
import DataContext from "../../context";

const Select = ({handleStatusChange = () => {}, currentColumn}) => {
    const {currentBoard} = useContext(DataContext);

    const options = currentBoard.columns.map((column, index) => <option defaultValue={column.name} key={index}>{column.name}</option>)

    return(
        <select id="select" onChange={handleStatusChange} className='card__status-select' name="column" defaultValue={currentColumn}>
            {options}
        </select>
    )
}

export default Select;