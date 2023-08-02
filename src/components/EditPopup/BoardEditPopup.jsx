import { useContext } from "react";
import '../TaskPopup/taskPopup.scss';
import './edit-popup.scss';
import DataContext from "../../context/context";
import { FormProvider } from "react-hook-form";
import InputListItemEditable from "../InputListItem/InputListItemEditable";
import { useCustomForm } from "../../useCustomForm";
import { updateDocInDatabase } from "../../services";

const BoardEditPopup = ({closeEditPopup}) =>{
    const {currentBoard} = useContext(DataContext);
    const {methods, append, remove, fields, isFeildsCreationComplete} = useCustomForm(currentBoard.columns);

    const handleAddColumnButtonClick = () => {
        append({name: 'new column'}, {shouldFocus: false});
    }

    const handleEditBoardFormSubmit = (data) => {
        updateDocInDatabase(`boards/${currentBoard.id}`, {
            name: data.name,
            columns: data.elements.map((item, index) => {
                return {...item, id: index}; 
            })
        });
        closeEditPopup();
    }

    const handlePopupExit = (e) => {
        if(!e.target.classList.contains('popup')) return;
        closeEditPopup();
    }

    const columnsElements = fields
        .map((column, index) => 
            <InputListItemEditable 
                key={column.id} 
                element={column} 
                index={index} 
                isColumn={true}
                handleInputDelete={remove}/>
            )
    
    return (
        <div className={`popup ${isFeildsCreationComplete ? 'popup_active' : ''}`} onClick={handlePopupExit}>
            <FormProvider {...methods}>
                <form className='popup__card' onSubmit={methods.handleSubmit(handleEditBoardFormSubmit)}>
                    <h3 className='popup__title'>Edit Board</h3>
                    <div className='popup__input'>
                        <label htmlFor="title" className='text-m'>Title</label>
                        <input className='popup__input-field' type="text" {...methods.register('name')} maxLength={20} required defaultValue={currentBoard.name}/>
                    </div>
                    <div className='popup__input'>
                        {columnsElements}
                        <button type="button" className='popup__btn' onClick={handleAddColumnButtonClick}>+ Add New Column</button>
                    </div>
                    <button type='submit' className='popup__btn submit-btn'>Save Changes?</button>
                </form>
            </FormProvider>
        </div>
    )
}

export default BoardEditPopup;