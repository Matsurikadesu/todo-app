import { useContext} from 'react';
import dataContext from '../../context';
import './button.scss';

const Button = () => {
    const onAddTaskPopupOpen = () => {
        // setState({
        //     ...state,
        //     add: 'Task'
        // })
        console.log('button clicked')
    }

    return (
        <button className="btn" onClick={onAddTaskPopupOpen} disabled={(1 === 0)}>
            <span className="btn-text">+ Add New Task</span>
        </button>
    )
}

export default Button;