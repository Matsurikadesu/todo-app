import { useContext } from "react";
import '../TaskPopup/taskPopup.scss';
import './edit-popup.scss';
import DataContext from "../../context";

const BoardEditPopup = ({closeEditPopup}) =>{
    const {currentBoard} = useContext(DataContext);

    const onAddColumn = (e) => {
        e.preventDefault();
        console.log('column added');
    }

    const onColumnDelete = (e) => {
        e.preventDefault();
        console.log('column deleted');
    }

    const onBoardEditSubmit = (e) => {
        e.preventDefault();
        console.log('submit board edit');
    }

    const handlePopupExit = (e) => {
        if(!e.target.classList.contains('popup')) return;
        closeEditPopup();
    }

    const columnsElements = currentBoard.columns.map((column, index) =>{
        return (
            <div className='card__subtask-input' key={index}>
                <input className='popup__input-field' type="text" defaultValue={column.name}/>
                <button className='card__subtask-delete' id={index} onClick={onColumnDelete}>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="12.7275" width="3" height="18" transform="rotate(45 12.7275 0)" fill="#828FA3"/>
                        <rect y="2.12132" width="3" height="18" transform="rotate(-45 0 2.12132)" fill="#828FA3"/>
                    </svg>
                </button>
            </div>
        )
    })
    
    return (
        <div className='popup' onClick={handlePopupExit}>
            <form className='popup__card' onSubmit={onBoardEditSubmit}>
                <h3 className='popup__title'>Edit Board</h3>
                <div className='popup__input'>
                    <label htmlFor="title" className='text-m'>Title</label>
                    <input className='popup__input-field' id='title' type="text" name='title' required defaultValue={currentBoard.name}/>
                </div>
                <div className='popup__input'>
                    {columnsElements}
                    <button className='popup__btn' onClick={onAddColumn}>+ Add New Column</button>
                </div>
                <button type='submit' className='popup__btn submit-btn'>Save Changes?</button>
            </form>
        </div>
    )
}

export default BoardEditPopup;