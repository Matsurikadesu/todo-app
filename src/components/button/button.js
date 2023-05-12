import { useContext} from 'react';
import './button.scss';
import dataContext from '../../context';

const Button = () => {
    const {state, setState} = useContext(dataContext);

    const onAddTaskPopupOpen = () => {
        setState({
            ...state,
            add: 'Task'
        })
    }

    console.log('render');

    return (
        <button className="btn" onClick={onAddTaskPopupOpen} disabled={(state.data.boards[state.currentBoard].columns.length === 0)}>
            <span className="btn-text">+ Add New Task</span>
        </button>
    )
}

export default Button;