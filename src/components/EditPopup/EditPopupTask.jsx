import { useContext, useState } from "react";
import dataContext from "../../context";
import Select from "../Select/Select";
import '../TaskPopup/taskPopup.scss';
import './edit-popup.scss';

const TaskEditPopup = ({name, description, id, subtasks, setIsEditing}) =>{

    const onColumnSelect = (e) =>{

    }

    const addNewSubtask = (e) => {

    }

    const onSubtaskDelete = (e) => {
        
    }

    const onTaskEditSubmit = (e) => {

    }

    const handlePopupExit = (e) => {
        if(!e.target.classList.contains('popup')) return;

        setIsEditing(false);
    }

    const subtasksElements = subtasks.map((subtask, index) => {
        return(
            <div className='card__subtask-input' key={index}>
                <input className='popup__input-field' type="text" defaultValue={subtask.name}/>
                <button className='card__subtask-delete' id={index} onClick={onSubtaskDelete}>
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
                    <div className='card__subtasks'>
                        {subtasksElements}
                    </div>
                    <button className='popup__btn' onClick={addNewSubtask}>+ Add New Subtask</button>
                </div>
                <div className='popup__input'>
                    <p className='text-m'>Status</p>
                    <Select onColumnSelect={onColumnSelect}/>
                </div>
                <button type='submit' className='popup__btn submit-btn'>Save Changes</button>
            </form>
        </div>
    )
}

export default TaskEditPopup;