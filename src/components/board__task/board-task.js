import { Component } from 'react';
import './board-task.scss';

class Task extends Component {
    constructor({props}){
        super(props);
    }

    render(){
        const {subtasks, title} = this.props.data;
        const {onSelectTask} = this.props;
        const subtasksAmount = subtasks.length;

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
}

export default Task;