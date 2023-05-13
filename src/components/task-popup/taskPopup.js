import './taskPopup.scss';
import EditBtn from '../edit-btn/EditBtn';
import EditMenu from '../edit-menu/EditMenu';
import Select from '../select/select';
import { useContext } from 'react';
import dataContext from '../../context';

const TaskPopup = ({isEditMenuOpened}) => {
    const {state, setState} = useContext(dataContext);
    const {currentBoard, shownTask} = state;
    const {title, description, subtasks} = shownTask;
    const newTask = JSON.parse(JSON.stringify(shownTask));
    
    const onSubtaskStatusChange = (e) => {
        const index = e.target.getAttribute('index');
        newTask.subtasks[index].isCompleted = !newTask.subtasks[index].isCompleted
    }

    const onColumnSelect = (e) =>{
        newTask.status = e.target.value;

    }

    const handleChange = (e) => {
        
        const boards = [];
        const oldData = JSON.parse(JSON.stringify(state.data)).boards;
        oldData.forEach((item, index) => {
            if(index === +currentBoard){
                item.columns.forEach(item => {
                    if(item.name === shownTask.status && item.name === newTask.status){
                        item.tasks = item.tasks.map(item => {
                            if(item.title === shownTask.title) {
                                item = newTask;
                            }
                            return item;
                        })
                    }else if(item.name === newTask.status && item.name !== shownTask.status){
                        item.tasks.push(newTask);
                    }else{
                        item.tasks = item.tasks.filter(item => item.title !== shownTask.title)
                    }
                })
            }
            boards.push(item);
        })

        if(e.target.classList.contains('popup')){
            setState({
                ...state,
                shownTask: null,
                edit: null,
                isEditMenuOpened: false,
                add: null,
                delete: false,
                data: {boards}
            });
        }
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
                    <Select onColumnSelect={onColumnSelect}/>
                </div>
                {isEditMenuOpened === 'Task' ? <EditMenu target={isEditMenuOpened}/> : null}
            </div>
        </div>
    );
}

export default TaskPopup;