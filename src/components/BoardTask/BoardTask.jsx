import { useState } from 'react';
import TaskPopup from '../TaskPopup/TaskPopup';
import './board-task.scss';
import TaskEditPopup from '../EditPopup/EditPopupTask';

const Task = ({name, id, description, subtasks}) => {
    const [isOpened, setIsOpened] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const onSelectTask = () => {
        setIsOpened(true);
    }

    const getCompletedSubtasks = () => {
        let result = 0;
        subtasks.forEach(subtask => subtask.iscompleted ? result++ : null);
        return result;
    };

    return(
        <>
            <div className='column__task' onClick={onSelectTask}>
                <h4 className='column__task-title'>{name}</h4>
                <div className='column__task-subtitle'>{getCompletedSubtasks()} of {subtasks.length} subtask</div>
            </div>

            {isOpened 
                ? <TaskPopup
                    name={name}
                    id={id}
                    description={description}
                    subtasks={subtasks}
                    setIsOpened={setIsOpened}
                    setIsEditing={setIsEditing}/> 
                : null
            }

            {isEditing 
                ? <TaskEditPopup
                    name={name}
                    id={id}
                    description={description}
                    subtasks={subtasks}
                    setIsEditing={setIsEditing}/>
                : null
            }
        </>
    );
}

export default Task;