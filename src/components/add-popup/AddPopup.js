import '../task-popup/taskPopup.scss';
import '../EditPopup/edit-popup.scss';
import Select from '../select/select';
import { useContext, useState } from 'react';
import dataContext from '../../context';

const AddPopup = ({onPopupExit}) => {
    const [placeholders, setPlaceholders] = useState([{placeholder: 'e.g. Make coffee'},{placeholder: 'e.g. Drink coffee & smile'}]); 
    const {state, setState} = useContext(dataContext);

    const onDeleteSubtask = (e) => {
        const subtask = e.target.closest('.card__subtask-input').getAttribute('index');
        const newPlaceholders = placeholders.splice(0, subtask).concat(placeholders.splice(subtask))
        setPlaceholders(newPlaceholders);
    }

    const onAddSubtask = (e) => {
        e.preventDefault();
        const newPlaceholders = placeholders.splice(0);
        newPlaceholders.push({placeholder: 'subtask title'});
        setPlaceholders(newPlaceholders);
    }

    const onAddTaskSubmit = (e) => {
        e.preventDefault();
        const form = e.target.closest('.popup__card');
        const subtasks = [];
        const status = form.column.value;

        placeholders.forEach((item, index) => {
            subtasks.push({
                title: form[`subtask${index}`].value,
                isCompleted: false
            })
        });

        const task = {
            title: form.title.value,
            description: form.description.value,
            status,
            subtasks,
        };

        const oldData = state.data.boards;
        const boards = oldData.map((item, index) => {
            if(index === +state.currentBoard){
                item.columns = item.columns.map(item => {
                    if(item.name === status){
                        item.tasks.push(task);
                    }
                    return item;
                })
            }
            return item;
        })

        setState({
            ...state,
            data: {boards},
            add: null
        })
    }

    const subtasksElements = placeholders.map((item, index) => {
                return(
                    <div className='card__subtask-input' key={index} index={index}>
                        <input className='popup__input-field' type="text" name={`subtask${index}`} placeholder={item.placeholder}/>
                        <button className='card__subtask-delete' onClick={onDeleteSubtask}>
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="12.7275" width="3" height="18" transform="rotate(45 12.7275 0)" fill="#828FA3"/>
                                <rect y="2.12132" width="3" height="18" transform="rotate(-45 0 2.12132)" fill="#828FA3"/>
                            </svg>
                        </button>
                    </div>
                )})

    return (
        <div className='popup' onClick={onPopupExit}>
        <form className="popup__card" onSubmit={onAddTaskSubmit}>
            <h3 className='popup__title'>Add Task</h3>
            <div className='popup__input'>
                <label htmlFor="title" className='text-m'>Title</label>
                <input className='popup__input-field' id='title' type="text" name='title' required  placeholder='e.g. Take coffee break'/>
            </div>
            <div className='popup__input'>
                <label htmlFor="description" className='text-m'>Description</label>
                <textarea className='popup__input-field' id='description' name='description' type="text" placeholder='e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little.'/>
            </div>
            <div className='popup__input'>
                <p className='text-m'>Subtasks</p>
                <div className='card__subtasks'>
                    {subtasksElements}
                </div>
                <button className='popup__btn' onClick={onAddSubtask}>+ Add New Subtask</button>
            </div>
            <div className='popup__input'>
                <p className='text-m'>Status</p>
                <Select/>
            </div>
            <button type='submit' className='popup__btn submit-btn'>Add Task</button>
        </form>
    </div>
    )
}

export default AddPopup;