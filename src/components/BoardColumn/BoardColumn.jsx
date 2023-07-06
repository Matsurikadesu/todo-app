import './board-column.scss';
import Task from '../BoardTask/BoardTask';

const BoardColumn = ({name, id, tasks}) => {
    const tasksElements = tasks.map((task) => {
        return(
            <Task 
                name={task.name}
                description={task.description}
                id={task.id}
                subtasks={task.subtasks}
                key={task.id}/>
        );
    });

    return(
        <div className='board__column'>
            <div className='column__header'>
                <span className='column__header-status'></span>
                <h3 className='column__header-text'>{name} ({tasks.length})</h3>
            </div>
            <div className='column__tasks'>
                {tasksElements}
            </div>
        </div>
    )
}

export default BoardColumn;