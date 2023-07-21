import '../TaskPopup/taskPopup.scss';
import '../EditPopup/edit-popup.scss';
import { FormProvider } from 'react-hook-form';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import InputListItemEditable from '../InputListItem/InputListItemEditable';
import { useCustomForm } from '../../useCustomForm';

const AddBoardPopup = ({setIsEditPopupOpen}) => {
    const initialFields = [{name: 'Todo'}, {name: 'Doing'}];
    const {methods, append, remove, isFeildsCreationComplete, fields} = useCustomForm(initialFields);

    const handleBoardSubmit = (data) =>{
        addDoc(collection(db, 'boards'), {
            name: data.name,
            columns: data.elements.map((item, index) => {
                return {
                    ...item,
                    id: index
                } 
            }),
            timestamp: new Date().getTime()
        })

        setIsEditPopupOpen(false);
    }

    const handleColumnAdd = () => {
        append({name: 'new column'}, {shouldFocus: false});
    }

    const handlePopupExit = (e) => {
        if(!e.target.classList.contains('popup')) return;
        setIsEditPopupOpen(false);
    }
    
    const columnsElements = fields
        .map((column, index) => 
            <InputListItemEditable 
                key={column.id} 
                element={column} 
                index={index} 
                handleInputDelete={remove}
                isColumn={true}/>
            )
    
    return (
        <div className={`popup ${isFeildsCreationComplete ? 'popup_active' : ''}`} onClick={handlePopupExit}>
            <FormProvider {...methods}>
                <form className='popup__card' onSubmit={methods.handleSubmit(handleBoardSubmit)}>
                    <h3 className='popup__title'>Add Board</h3>
                    <div className='popup__input'>
                        <label htmlFor="title" className='text-m'>Title</label>
                        <input className='popup__input-field' id='title' type="text" {...methods.register('name')} maxLength={50} placeholder='e.g. Web Design' required/>
                    </div>
                    <div className='popup__input'>
                        {columnsElements}
                        <button type='button' className='popup__btn' onClick={handleColumnAdd}>+ Add New Column</button>
                    </div>
                    <button type='submit' className='popup__btn submit-btn'>Add Board</button>
                </form>
            </FormProvider>
        </div>
    )
}

export default AddBoardPopup;