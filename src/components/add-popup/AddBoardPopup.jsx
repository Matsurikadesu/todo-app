import '../TaskPopup/taskPopup.scss';
import '../EditPopup/edit-popup.scss';
import { useForm, useFieldArray } from 'react-hook-form';
import { useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import InputListItemEditable from '../InputListItem/InputListItemEditable';

const AddBoardPopup = ({setIsEditPopupOpen}) => {
    const methods = useForm();
    const { fields, append, remove } = useFieldArray({
        control: methods.control,
        name: 'elements'
    });
    
    useEffect(() => {
        const columns = [{name: 'Todo'}, {name: 'Doing'}];
        columns.forEach(item => append(item));

        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        remove(3);
        remove(2)

    }, [remove])

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
        append({name: 'new column'});
    }

    const handleColumnDelete = (index) => {
        remove(index);
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
                handleInputDelete={handleColumnDelete}
                isColumn={true}/>
            )
    
    return (
        <div className='popup' onClick={handlePopupExit}>
            <form className='popup__card' onSubmit={methods.handleSubmit(handleBoardSubmit)}>
                <h3 className='popup__title'>Add Board</h3>
                <div className='popup__input'>
                    <label htmlFor="title" className='text-m'>Title</label>
                    <input className='popup__input-field' id='title' type="text" {...methods.register('name')} placeholder='e.g. Web Design' required/>
                </div>
                <div className='popup__input'>
                    {columnsElements}
                    <button type='button' className='popup__btn' onClick={handleColumnAdd}>+ Add New Column</button>
                </div>
                <button type='submit' className='popup__btn submit-btn'>Add Board</button>
            </form>
        </div>
    )
}

export default AddBoardPopup;