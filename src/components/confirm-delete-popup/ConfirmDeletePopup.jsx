import { useContext } from 'react';
import './confirm-delete-popup.scss';
import dataContext from '../../context';

const ConfirmDeletePopup = ({onPopupExit}) => {
    const {state, setState} = useContext(dataContext);

    const onDeleteBoard = () => {
        const oldData = state.data;
        if(oldData.length <= 1) return;
        const boards = oldData.boards.filter((item, index) => (index !== +state.currentBoard))
        
        setState({
            ...state,
            data: {boards},
            isEditMenuOpened: false,
            currentBoard: 0, 
            delete: false
        })
    }

    const onDeleteTask = () => {
        const boards = [];
        state.data.boards.forEach((item, index) => {
            if(index === +state.currentBoard){
                item.columns.forEach((item) => {
                    item.tasks = item.tasks.filter(item => (item.title !== state.shownTask.title));
                })
            }
            boards.push(item);
        })

        setState({
            ...state,
            data: {boards},
            isEditMenuOpened: false,
            shownTask: null, 
            delete: false
        })
    }

    const onCancel = () => {
        setState({
            ...state,
            delete: false,
            isEditMenuOpened: false
        })
    }

    let popupText = 'Something went wrong'
    if(state.isEditMenuOpened === 'Task'){
        popupText = `Are you sure you want to delete the ‘${state.shownTask.title}’ task and its subtasks? This action cannot be reversed.`
    }else{
        popupText = `Are you sure you want to delete the ‘${state.data.boards[+state.currentBoard].name}’ board? This action will remove all columns and tasks and cannot be reversed.`
    }
    return(
        <div className='confirm-popup' onClick={onPopupExit}>
            <div className='popup__body'>
                <h2 className='popup__title'>Delete this {state.isEditMenuOpened.toLowerCase()}?</h2>
                <p className='popup__text'>{popupText}</p>
                <div className='popup__buttons'>
                    <button className='popup__btn popup__btn_delete' onClick={state.isEditMenuOpened === 'Task' ? onDeleteTask : onDeleteBoard}>Delete</button>
                    <button className='popup__btn' onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDeletePopup;