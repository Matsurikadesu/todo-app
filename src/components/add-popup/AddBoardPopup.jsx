import '../TaskPopup/taskPopup.scss';
import '../EditPopup/edit-popup.scss';
import { useForm, useFieldArray } from 'react-hook-form';
import { useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';

const AddBoardPopup = ({setIsEditPopupOpen}) => {
    const methods = useForm();
    const { fields, append, remove } = useFieldArray({
        control: methods.control,
        name: 'columns'
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
            columns: data.columns.map((item, index) => {
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
    
    const columnsElements = fields.map((column, index) =>{
        return (
            <div className='card__subtask-input' key={column.id}>
                <input className='popup__input-field' {...methods.register(`columns.${index}.name`)} type="text" placeholder='Column name' defaultValue={column.name}/>
                <button type='button' className='card__subtask-delete' onClick={handleColumnDelete}>
                    <img src="images/cross.svg" alt="cross" />
                </button>
            </div>
        )
    })
    
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