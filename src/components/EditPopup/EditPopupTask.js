import { useContext } from "react";
import dataContext from "../../context";
import Select from "../select/select";
import '../task-popup/taskPopup.scss';
import './edit-popup.scss';

const EditPopupTask = ({onPopupExit}) =>{
    const {state, setState} = useContext(dataContext);
    const {data, currentBoard, shownTask } = state;
    const {title, description, subtasks} = state.shownTask;

    const addNewSubtask = (e) => {
        e.preventDefault();
        const oldData = data;
        const boards = oldData.boards.map((item, index) =>{
            if(index === +currentBoard){
                item.columns.forEach(item => {
                    item.tasks.forEach(item => {
                        if(item.title === shownTask.title){
                            item.subtasks.push({title: 'New subtask', isCompleted: false})
                        }
                    })
                })
            }
            return item;
        })

        setState({
            ...state,
            data: {boards}
        })
    }

    const onSubtaskDelete = (e) => {
        e.preventDefault();
        const target = +e.target.closest('button').getAttribute('id');
        const oldData = data;
        const boards = oldData.boards.map((item, index) => {
            if(index === +currentBoard){
                item.columns.forEach(item => {
                    item.tasks.forEach(item => {
                        if(item.title === shownTask.title){
                            item.subtasks = item.subtasks.filter((item, index) => index !== target)
                        }
                    })
                })
            }
            return item;
        })

        setState({
            ...state,
            data: {boards}
        })
    }

    const onTaskEditSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const oldData = state.data.boards;
        const boards = oldData.map((item, index) =>{
            if(index === currentBoard){
                item.columns.forEach(item => {
                    item.tasks.map(item => {
                        if(item.title === shownTask.title){
                            item.title = form[0].value;
                            item.description = form[1].value;
                            let index = 2;
                            
                            item.subtasks.forEach((item) => {
                                item.title = form[index].value;
                                index += 2;
                            })
                        }
                        return item;
                    })
                })
            }
            return item;
        })
        
        setState({
            ...state,
            data: {boards},
            edit: null
        })
    }

    const subtasksElements = subtasks.map((item, index) => {
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
                    <Select/>
                </div>
                <button type='submit' className='popup__btn submit-btn'>Save Changes</button>
            </form>
        </div>
    )
}

export default EditPopupTask;