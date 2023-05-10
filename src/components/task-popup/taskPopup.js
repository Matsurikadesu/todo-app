import './taskPopup.scss';
import EditBtn from '../edit-btn/EditBtn';
import EditMenu from '../edit-menu/EditMenu';
import Select from '../select/select';

const TaskPopup = ({shownTask, onPopupExit, isEditMenuOpened, menuTarget}) => {
    const {title, description, subtasks} = shownTask;
    let completedSubtasksCount = 0;

    const subtasksList = subtasks
        .map((item, index) => {
            if(item.isCompleted){
                completedSubtasksCount++;
            }

            return(
                <li className='card__subtasks-item' key={index}>
                    <input className='card__subtasks-checkbox' type="checkbox" defaultChecked={item.isCompleted}/>
                    <span className='card__subtasks-label'>{item.title}</span>
                </li>
            )
        })

    let isHidden = false;
    if (!description){
        isHidden = true;
    }

    return(
        <div className='popup' onClick={onPopupExit}>
            <div className="popup__card">
                <div className='card__header'>
                    <h3 className='card__title'>{title}</h3>
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
                    <Select/>
                </div>
                {isEditMenuOpened && menuTarget === 'Task' ? <EditMenu/> : null}
            </div>
        </div>
    );
}

export default TaskPopup;