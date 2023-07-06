import './taskPopup.scss';
import EditBtn from '../EditButton/EditBtn';
import EditMenu from '../EditMenu/EditMenu';
import Select from '../Select/Select';
import { useState } from 'react';

const TaskPopup = ({name, description, id, subtasks}) => {
    const [isEditing, setIsEditing] = useState(false);

    const onSubtaskStatusChange = (e) => {
        console.log('subtask status changed')
        // const index = e.target.getAttribute('index');
        // newTask.subtasks[index].isCompleted = !newTask.subtasks[index].isCompleted
    }

    const onColumnSelect = (e) =>{
        console.log('column selected')

    }

    const handleChange = (e) => {
        console.log('change')
    }

    let completedSubtasksCount = 0;

    const subtasksList = subtasks
        .map((item, index) => {
            if(item.isCompleted){
                completedSubtasksCount++;
            }

            return(
                <li className='card__subtasks-item' key={index}>
                    <input className='card__subtasks-checkbox' index={index} onChange={onSubtaskStatusChange} type="checkbox" defaultChecked={item.isCompleted}/>
                    <span className='card__subtasks-label'>{item.title}</span>
                </li>
            )
        })

    let isHidden = false;
    if (!description){
        isHidden = true;
    }

    return(
        <div className='popup' onClick={handleChange}>
            <div className="popup__card" data-id={id}>
                <div className='card__header'>
                    <h3 className='card__title'>{name}</h3>
                    <EditBtn target='Task'/>
                </div>
                <h4 className='card__subtitle' hidden={isHidden}>{description}</h4>
                <div className='card__subtasks'>
                    <p className='card__subtasks-count'>Subtasks ({completedSubtasksCount} of {subtasks.length})</p>
                    <ul className='card__subtasks-list'>
                        {subtasksList}
                    </ul>
                </div>
                <div className='card__status'>
                    <h4 className='card__status-text'>Current Status</h4>
                    <Select onColumnSelect={onColumnSelect}/>
                </div>
                {isEditing ? <EditMenu target={this}/> : null}
            </div>
        </div>
    );
}

export default TaskPopup;