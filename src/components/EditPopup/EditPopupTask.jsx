import { useContext, useState } from "react";
import dataContext from "../../context";
import Select from "../Select/Select";
import '../TaskPopup/taskPopup.scss';
import './edit-popup.scss';

const EditPopupTask = ({onPopupExit}) =>{
    const {state, setState} = useContext(dataContext);
    const {currentBoard, shownTask } = state;
    const {title, description} = state.shownTask;
    const [task, setTask] = useState(JSON.parse(JSON.stringify(shownTask)));
    const newTask = JSON.parse(JSON.stringify(task));

    const onColumnSelect = (e) =>{
        newTask.status = e.target.value;
        console.log(newTask.status)
    }

    const addNewSubtask = (e) => {
        e.preventDefault();
        newTask.subtasks.push({title: 'New subtask', isCompleted: false});

        setTask(newTask);
    }

    const onSubtaskDelete = (e) => {
        e.preventDefault();
        const target = +e.target.closest('button').getAttribute('id');
        const newTask = JSON.parse(JSON.stringify(task));
        newTask.subtasks = newTask.subtasks.filter((item, index) => index !== target);

        setTask(newTask);
    }

    const onTaskEditSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const oldData = JSON.parse(JSON.stringify(state.data)).boards;
        newTask.title = form.title.value;
        newTask.description = form.description.value;
        let index = 2;
        
        newTask.subtasks.forEach((item) => {
            item.title = form[index].value;
            index += 2;
        })
        
        const boards = [];
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
                        return item;
                    }
                })
            }
            boards.push(item);
        })
        
        setState({
            ...state,
            data: {boards},
            shownTask: null,
            edit: null
        })
    }

    const subtasksElements = task.subtasks.map((item, index) => {
        return(
            <div className='card__subtask-input' key={index}>
                <input className='popup__input-field' type="text" defaultValue={item.title}/>
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
        <div className='popup' onClick={onPopupExit}>
            <form className="popup__card" onSubmit={onTaskEditSubmit}>
                <h3 className='popup__title'>Edit Task</h3>
                <div className='popup__input'>
                    <label htmlFor="title" className='text-m'>Title</label>
                    <input className='popup__input-field' id='title' type="text" name='title' required defaultValue={title}/>
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

export default EditPopupTask;