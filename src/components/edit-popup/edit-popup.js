import { useContext } from 'react';
import Select from '../select/select';
import dataContext from '../../context';
import '../task-popup/taskPopup.scss';
import './edit-popup.scss';

const EditPopup = ({onPopupExit}) => {
    const {state, setState} = useContext(dataContext);
    const {data, menuTarget, edit, shownTask, currentBoard} = state;
    const currentBoardNew = data.boards[currentBoard];

    const onEditSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const oldData = data;
        let boards = {};
        if(menuTarget === 'Board'){
            boards = oldData.boards.map((item, index) => {
                if(index === currentBoard){
                    item.name = form[0].value;

                    let index = 1;
                    item.columns.forEach((item) => {
                        item.name = form[index].value;
                        index = index + 2;
                    })
                }
                return item;
            })
        }else if(menuTarget === 'Task'){
            boards = oldData.boards.map((item, index) =>{
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
        }
        setState({
            ...state,
            data: {boards},
            edit: null
        })
    }

    const addNewSubtask = (e) => {
        e.preventDefault();
        const oldData = data;
        let boards = {};

        boards = oldData.boards.map((item, index) =>{
            if(index === currentBoard){
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

    if(edit === 'Task'){
        const {title, description, subtasks} = shownTask;

        const elements = subtasks.map((item, index) => {
            return(
                <div className='card__subtask-input' key={index}>
                    <input className='popup__input-field' type="text" defaultValue={item.title}/>
                    <button className='card__subtask-delete'>
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
                <form className="popup__card" onSubmit={onEditSubmit}>
                    <h3 className='popup__title'>Edit {edit}</h3>
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
                            {elements}
                        </div>
                        <button className='popup__btn' onClick={addNewSubtask}>+ Add New Subtask</button>
                    </div>
                    <div className='popup__input'>
                        <p className='text-m'>Status</p>
                        <Select/>
                    </div>
                    <button type='submit' className='popup__btn submit-btn' onSubmit={onEditSubmit}>Save Changes</button>
                </form>
            </div>
        )
    } else if(edit === 'Board'){
        const {name, columns} = currentBoardNew;
        
        const elements = columns.map((item, index) =>{
            return (
                <div className='card__subtask-input' key={index}>
                    <input className='popup__input-field' type="text" defaultValue={item.name}/>
                    <button className='card__subtask-delete'>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="12.7275" width="3" height="18" transform="rotate(45 12.7275 0)" fill="#828FA3"/>
                            <rect y="2.12132" width="3" height="18" transform="rotate(-45 0 2.12132)" fill="#828FA3"/>
                        </svg>
                    </button>
                </div>
            )
        })

        return (
            <div className='popup' onClick={onPopupExit}>
                <form className='popup__card' onSubmit={onEditSubmit}>
                    <h3 className='popup__title'>Edit {edit}</h3>
                    <div className='popup__input'>
                        <label htmlFor="title" className='text-m'>Title</label>
                        <input className='popup__input-field' id='title' type="text" name='title' required defaultValue={name}/>
                    </div>
                    <div className='popup__input'>
                        {elements}
                        <button className='popup__btn'>+ Add New Column</button>
                    </div>
                    <button type='submit' className='popup__btn submit-btn'>Save Changes?</button>
                </form>
            </div>
        )
    }
}

export default EditPopup;