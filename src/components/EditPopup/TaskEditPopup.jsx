import { useContext, useState } from "react";
import Select from "../Select/Select";
import '../TaskPopup/taskPopup.scss';
import './edit-popup.scss';
import DataContext from "../../context";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const TaskEditPopup = ({name, description, id, dataSubtasks, status, setIsEditing}) =>{
    const { boardId } = useContext(DataContext);
    const [ subtasks, setSubtasks ] = useState(dataSubtasks);

    const handleSubtaskAdd = async () => {
        const newSubtasks = subtasks.slice(0);
        newSubtasks.push({name: 'New subtask', iscompleted: false, id: subtasks.length});
        setSubtasks(newSubtasks);
    }

    const handleSubtaskDelete = (e) => {
        const idToDelete = Number(e.target.closest('.card__subtask-input').id);
        setSubtasks(subtasks.filter(item => item.id !== idToDelete));
    }

    const handleSubtaskChange = (e) => {
        //нужно добавить обработку изменения имени subtask
    }

    const onTaskEditSubmit = (e) => {
        e.preventDefault();
        const updatedTask = {};
        updatedTask.status = document.getElementById('select').value;
        updatedTask.name = document.getElementById('title').value;
        updatedTask.description = document.getElementById('description').value;
        updatedTask.subtasks = subtasks;
        updatedTask.timestamp = new Date().getTime();
        updateDoc(doc(db, 'boards', boardId, 'tasks', id), updatedTask);
        setIsEditing(false);
    }

    const handlePopupExit = (e) => {
        if(!e.target.classList.contains('popup')) return;

        setIsEditing(false);
    }

    const subtasksElements = subtasks.map((subtask, index) => {
        return(
            <div className='card__subtask-input' key={index} id={index}>
                <input className='popup__input-field' onChange={handleSubtaskChange} type="text" defaultValue={subtask.name}/>
                <button className='card__subtask-delete' id={index} onClick={handleSubtaskDelete}>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="12.7275" width="3" height="18" transform="rotate(45 12.7275 0)" fill="#828FA3"/>
                        <rect y="2.12132" width="3" height="18" transform="rotate(-45 0 2.12132)" fill="#828FA3"/>
                    </svg>
                </button>
            </div>
        )
    })

    return(
        <div className='popup' onClick={handlePopupExit} data-id={id}>
            <form className="popup__card" onSubmit={onTaskEditSubmit}>
                <h3 className='popup__title'>Edit Task</h3>
                <div className='popup__input'>
                    <label htmlFor="title" className='text-m'>Title</label>
                    <input className='popup__input-field' id='title' type="text" name='title' required defaultValue={name}/>
                </div>
                <div className='popup__input'>
                    <label htmlFor="description" className='text-m'>Description</label>
                    <textarea className='popup__input-field' id='description' name='description' type="text" placeholder='e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little.' defaultValue={description}/>
                </div>
                <div className='popup__input'>
                    <p className='text-m'>Subtasks</p>
                    <fieldset name="subtasks" className='card__subtasks'>
                        {subtasksElements}
                    </fieldset>
                    <button className='popup__btn' onClick={handleSubtaskAdd} type="button">+ Add New Subtask</button>
                </div>
                <div className='popup__input'>
                    <p className='text-m'>Status</p>
                    <Select 
                        // handleStatusChange={handleStatusChange}
                        currentColumn={status}/>
                </div>
                <button type='submit' className='popup__btn submit-btn'>Save Changes</button>
            </form>
        </div>
    )
}

export default TaskEditPopup;