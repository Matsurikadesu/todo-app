import { useContext } from 'react';
import './confirm-delete-popup.scss';
import DataContext from '../../context/context';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

const ConfirmDeletePopup = ({setIsDeletePopupOpen, target, task, setIsEditMenuOpened}) => {
    const { currentBoard, changeBoardId, boards } = useContext(DataContext);
    /**Удаляет текущую board и выбирает новую */
    const onDeleteBoard = () => {
        if(boards.length === 1) return;

        changeBoardId(currentBoard.id !== boards[0].id ? boards[0].id : boards[1].id);
        deleteDoc(doc(db, 'boards', currentBoard.id));
        setIsEditMenuOpened(false);
    }

    const handleTaskDelete = () => {
        deleteDoc(doc(db, 'boards', currentBoard.id, 'tasks', task.id));
    }

    const handlePopupExit = (e) => {
        const isDeletePopup = e.target.classList.contains('confirm-popup') || e.target.classList.contains('popup__btn');

        if(isDeletePopup) {
            setIsDeletePopupOpen(false);
            setIsEditMenuOpened(false);
        }
    }

    let popupText = 'Are you sure you want to delete the';

    target === 'Task' 
        ? popupText +=`‘${task.name}’ task and its subtasks? This action cannot be reversed.`
        : popupText += `‘${currentBoard.name}’ board? This action will remove all columns and tasks and cannot be reversed.`

    return(
        <div className='confirm-popup' onClick={handlePopupExit}>
            <div className='popup__body'>
                <h2 className='popup__title'>Delete this {target.toLowerCase()}?</h2>
                <p className='popup__text'>{popupText}</p>
                <div className='popup__buttons'>
                    <button className='popup__btn popup__btn_delete' onClick={target === 'Task' ? handleTaskDelete : onDeleteBoard}>Delete</button>
                    <button className='popup__btn' onClick={handlePopupExit}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDeletePopup;