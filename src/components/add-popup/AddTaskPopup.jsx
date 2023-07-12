import '../TaskPopup/taskPopup.scss';
import '../EditPopup/edit-popup.scss';
import Select from '../Select/Select';
import { useContext, useEffect } from 'react';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import DataContext from '../../context';
import InputListItemEditable from '../InputListItem/InputListItemEditable';

const AddTaskPopup = ({setIsAdding}) => {
    const {currentBoard} = useContext(DataContext);
    const methods = useForm();
    const { fields, append, remove } = useFieldArray({
        control: methods.control,
        name: 'elements'
    });
    
    useEffect(() => {
        const placeholders = [{placeholder: 'e.g. Make coffee'}, {placeholder: 'e.g. Drink coffee & smile'}];
        placeholders.forEach(item => append(item));
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        remove(3);
        remove(2)

    }, [remove])

    const handleSubtaskDelete = (indexToDelete) => {
        remove(indexToDelete);
    }

    const handleSubtaskAdd = (e) => {
        e.preventDefault();
        append({placeholder: 'new subtask'});
    }

    const handleTaskSubmit = (data) => {
        const subtasks = data.elements.map(item => {
            return {
                name: item.name,
                iscompleted: false
            }
        })

        addDoc(collection(db, 'boards', currentBoard.id, 'tasks'), {
            name: data.name, 
            description: data.description, 
            status: data.status,
            subtasks,
            timestamp: new Date().getTime()
        })

        setIsAdding(false);
    }

    const handlePopupExit = (e) => {
        if(!e.target.classList.contains('popup')) return;
        setIsAdding(false);
    }

    const subtasksElements = 
        fields.map((subtask, index) => 
            <InputListItemEditable 
                key={subtask.id} 
                element={subtask} 
                index={index} 
                handleInputkDelete={handleSubtaskDelete}/>
            );

    return (
        <div className='popup' onClick={handlePopupExit}>
            <FormProvider {...methods}>
                <form className="popup__card" onSubmit={methods.handleSubmit(handleTaskSubmit)}>
                    <h3 className='popup__title'>Add Task</h3>
                    <div className='popup__input'>
                        <label htmlFor="title" className='text-m'>Title</label>
                        <input className='popup__input-field' id='title' type="text" {...methods.register('name')} required  placeholder='e.g. Take coffee break'/>
                    </div>
                    <div className='popup__input'>
                        <label htmlFor="description" className='text-m'>Description</label>
                        <textarea className='popup__input-field' id='description' {...methods.register('description')} type="text" placeholder='e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little.'/>
                    </div>
                    <div className='popup__input'>
                        <p className='text-m'>Subtasks</p>
                        <div className='card__subtasks'>
                            {subtasksElements}
                        </div>
                        <button type='button' className='popup__btn' onClick={handleSubtaskAdd}>+ Add New Subtask</button>
                    </div>
                    <div className='popup__input'>
                        <p className='text-m'>Status</p>
                        <Select/>
                    </div>
                    <button type='submit' className='popup__btn submit-btn'>Add Task</button>
                </form>
            </FormProvider>
        </div>
    )
}

export default AddTaskPopup;