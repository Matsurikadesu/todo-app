import './board-task.scss';

const Task = ({title, subtasks}) => {
    const subtasksAmount = subtasks.length;
    const getCompletedSubtasks = () => {
        let result = 0;
        subtasks.forEach(element => element.isCompleted ? result++ : null);
        return result;
    };

    return(
        <div className='column__task'>
            <h4 className='column__task-title'>{title}</h4>
            <div className='column__task-subtitle'>{getCompletedSubtasks()} of {subtasksAmount} subtask</div>
        </div>
    );
}

export default Task;