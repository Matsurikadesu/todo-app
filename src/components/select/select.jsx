import { useContext } from "react";
import DataContext from "../../context";

const Select = ({onColumnSelect = false, name}) => {
    const {currentBoard} = useContext(DataContext);

    const options = currentBoard.columns.map((column, index) => {
        return(
            <option defaultValue={column.name} key={index}>{column.name}</option>
        )
    })

    return(
        <select onChange={onColumnSelect} className='card__status-select' name="column" defaultValue={name}>
            {options}
        </select>
    )
}

export default Select;