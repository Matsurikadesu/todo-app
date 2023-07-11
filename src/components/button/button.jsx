import { useContext, useState } from 'react';
import './button.scss';
import AddTaskPopup from '../Add-popup/AddTaskPopup';
import DataContext from '../../context';

const Button = () => {
    const { currentBoard } = useContext(DataContext);
    const [ isAdding, setIsAdding ] = useState(false);

    const onAddTaskPopupOpen = () => {
        setIsAdding(true);
    }

    return (
        <>
            <button className="btn" onClick={onAddTaskPopupOpen} disabled={!currentBoard.columns.length}>
                <span className="btn-text">+ Add New Task</span>
            </button>
            {isAdding ? <AddTaskPopup setIsAdding={setIsAdding}/> : null}
        </>
    )
}

export default Button;