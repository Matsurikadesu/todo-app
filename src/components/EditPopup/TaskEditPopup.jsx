import { useContext } from "react";
import Select from "../Select/Select";
import '../TaskPopup/taskPopup.scss';
import './edit-popup.scss';
import DataContext from "../../context/context";
import { FormProvider } from "react-hook-form";
import InputListItemEditable from "../InputListItem/InputListItemEditable";
import { useCustomForm } from "../../useCustomForm";
import { updateDocInDatabase } from "../../services";


const TaskEditPopup = ({name, description, id, subtasks, status, setIsEditing, setIsOpened}) =>{
    const { boardId } = useContext(DataContext);
    const {methods, append, fields, remove, isFeildsCreationComplete} = useCustomForm(subtasks, () => setIsOpened(false));
    
    const handleSubtaskAdd = () => {
        append({name: 'new subtask', iscompleted: false}, {shouldFocus: false});
    }

    const handleTaskEditSubmit = (data) => {
        updateDocInDatabase(`boards/${boardId}/tasks/${id}`, {
            name: data.name,
            description: data.description,
            subtasks: data.elements,
            status: data.status
        })
        setIsEditing(false);
    }

    const handlePopupExit = (e) => {
        if(!e.target.classList.contains('popup')) return;

        setIsEditing(false);
    }

    const subtasksElements = fields
        .map((subtask, index) => 
            <InputListItemEditable
                key={subtask.id}
                element={subtask} 
                index={index} 
                handleInputDelete={remove}/>
            )

    return(
        <div className={`popup ${isFeildsCreationComplete ? 'popup_active' : ''}`} onClick={handlePopupExit}>
            <FormProvider {...methods}>
                <form className="popup__card" onSubmit={methods.handleSubmit(handleTaskEditSubmit)}>
                    <h3 className='popup__title'>Edit Task</h3>
                    <div className='popup__input'>
                        <label htmlFor="title" className='text-m'>Title</label>
                        <input className='popup__input-field' id='title' type="text" {...methods.register('name')} maxLength={50} required defaultValue={name}/>
                    </div>
                    <div className='popup__input'>
                        <label htmlFor="description" className='text-m'>Description</label>
                        <textarea className='popup__input-field' id='description' {...methods.register('description')} maxLength={200} type="text" placeholder='e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little.' defaultValue={description}/>
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
                        <Select currentColumn={status}/>
                    </div>
                    <button type='submit' className='popup__btn submit-btn'>Save Changes</button>
                </form>
            </FormProvider>
        </div>
    )
}

export default TaskEditPopup;