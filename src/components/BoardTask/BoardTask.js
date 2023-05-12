import { useContext } from 'react';
import './board-task.scss';
import dataContext from '../../context';

const Task = ({data}) => {
    const {subtasks, title} = data;
    const subtasksAmount = subtasks.length;
    const {state, setState} = useContext(dataContext);

    const onSelectTask = () => {
        setState({
            ...state,
            shownTask: data,
            isEditMenuOpened: false
        });
    }


    const getCompletedSubtasks = () => {
        let result = 0;
        subtasks.forEach(element => element.isCompleted ? result++ : null);
        return result;
    };

    return(
        <div className='column__task' onClick={onSelectTask}>
            <h4 className='column__task-title'>{title}</h4>
            <div className='column__task-subtitle'>{getCompletedSubtasks()} of {subtasksAmount} subtask</div>
        </div>
    );
}

export default Task;