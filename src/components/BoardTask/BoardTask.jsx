import './board-task.scss';

const Task = ({name, id, description, subtasks}) => {

    const onSelectTask = () => {
        // setState({
        //     ...state,
        //     shownTask: data,
        //     isEditMenuOpened: false
        // });
    }

    const getCompletedSubtasks = () => {
        let result = 0;
        subtasks.forEach(subtask => subtask.iscompleted ? result++ : null);
        return result;
    };

    return(
        <div className='column__task' onClick={onSelectTask}>
            <h4 className='column__task-title'>{name}</h4>
            <div className='column__task-subtitle'>{getCompletedSubtasks()} of {subtasks.length} subtask</div>
        </div>
    );
}

export default Task;