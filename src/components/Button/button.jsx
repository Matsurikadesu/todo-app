import { useContext, useState } from 'react';
import './button.scss';
import AddTaskPopup from '../AddPopup/AddTaskPopup';
import DataContext from '../../context/context';

const Button = () => {
    const { currentBoard } = useContext(DataContext);
    const [ isAdding, setIsAdding ] = useState(false);

    const onAddTaskPopupOpen = () => {
        setIsAdding(true);
    }

    return (
        <>
            <button className="btn" onClick={onAddTaskPopupOpen} disabled={!currentBoard.columns.length}>
                <img className='btn__img' src='images/plus.svg' alt='plus'/>
                <span className="btn-text">
                    + Add New Task
                    </span>
            </button>
            {isAdding ? <AddTaskPopup setIsAdding={setIsAdding}/> : null}
        </>
    )
}

export default Button;