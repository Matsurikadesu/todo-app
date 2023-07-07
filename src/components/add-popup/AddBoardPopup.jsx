import '../TaskPopup/taskPopup.scss';
import '../EditPopup/edit-popup.scss';
import { useState } from 'react';

const AddBoardPopup = ({setIsEditPopupOpen}) => {
    const [ columns ] = useState([{name: 'Todo'}, {name: 'Doing'}])
    
    const onBoardAddSubmit = (e) =>{
        e.preventDefault();
        console.log('board added');
    }

    const onAddColumn = (e) => {
        e.preventDefault();
        console.log('collumn added');
    }

    const onColumnDelete = (e) => {
        e.preventDefault();
        console.log('column deleted');
    }

    const handlePopupExit = (e) => {
        if(!e.target.classList.contains('popup')) return;
        setIsEditPopupOpen(false);
    }
    
    const columnsElements = columns.map((column, index) =>{
        return (
            <div className='card__subtask-input' key={index}>
                <input className='popup__input-field' name={`column${index}`} type="text" placeholder='Column name' defaultValue={column.name}/>
                <button className='card__subtask-delete' index={index} onClick={onColumnDelete}>
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
            <form className='popup__card' onSubmit={onBoardAddSubmit}>
                <h3 className='popup__title'>Add Board</h3>
                <div className='popup__input'>
                    <label htmlFor="title" className='text-m'>Title</label>
                    <input className='popup__input-field' id='title' type="text" name='title' placeholder='e.g. Web Design' required/>
                </div>
                <div className='popup__input'>
                    {columnsElements}
                    <button className='popup__btn' onClick={onAddColumn}>+ Add New Column</button>
                </div>
                <button type='submit' className='popup__btn submit-btn'>Add Board</button>
            </form>
        </div>
    )
}

export default AddBoardPopup;