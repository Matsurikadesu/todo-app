import './taskPopup.scss';
import EditBtn from '../EditButton/EditBtn';
import EditMenu from '../EditMenu/EditMenu';
import Select from '../Select/Select';
import { useContext, useEffect, useState } from 'react';
import { useFieldArray, useForm, FormProvider } from 'react-hook-form';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import DataContext from '../../context';
import InputListItem from '../InputListItem/InputListItem';

const TaskPopup = ({name, description, id, subtasks, setIsOpened, setIsEditing, status}) => {
    const {currentBoard} = useContext(DataContext);
    const [isEditMenuOpened, setIsEditMenuOpened] = useState(false);
    const methods = useForm();
    const { fields, append, remove } = useFieldArray({
        control: methods.control,
        name: 'subtasks'
    });

    useEffect(() => {
        subtasks.forEach(subtask => {
            append({
                name: subtask.name,
                iscompleted: subtask.iscompleted
            })
        })
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        remove(3);
        remove(2)
        //eslint-disable-next-line
    }, [remove])

    const handlePopupExit = (e) => {
        if(!e.target.classList.contains('popup')) return;

        e.target.querySelector('#testbtn').click();
        setIsOpened(false);
    }

    const handleTaskSubmit = (data) => {
        updateDoc(doc(db, 'boards', currentBoard.id, 'tasks', id), {subtasks: data.subtasks, status: data.status})
    }

    const handleEditButtonClick = () => {
        setIsEditMenuOpened(!isEditMenuOpened);
    }

    let completedSubtasksCount = 0;

    const subtasksElements = fields
        .map((subtask, index) => {
            if(subtask.iscompleted) completedSubtasksCount++
            return <InputListItem key={subtask.id} subtask={subtask} index={index}/>
        })

    return(
        <div className='popup' onClick={handlePopupExit}>
            <FormProvider {...methods}>
                <form id='testform' className="popup__card" onSubmit={methods.handleSubmit(handleTaskSubmit)}>
                    <button id='testbtn' type='submit' hidden={true}></button>
                    <div className='card__header'>
                        <h3 className='card__title'>{name}</h3>
                        <EditBtn 
                            target='Task'
                            handleEditButtonClick={handleEditButtonClick}/>
                    </div>
                    <h4 className='card__subtitle' hidden={!description}>{description}</h4>
                    <div className='card__subtasks'>
                        <p className='card__subtasks-count'>Subtasks ({completedSubtasksCount} of {subtasks.length})</p>
                        <ul className='card__subtasks-list'>
                            {subtasksElements}
                        </ul>
                    </div>
                    <div className='card__status'>
                        <h4 className='card__status-text'>Current Status</h4>
                        <Select currentColumn={status}/>
                    </div>

                    {isEditMenuOpened 
                        ? <EditMenu 
                            target={'Task'} 
                            setIsEditing={setIsEditing} 
                            setIsOpened={setIsOpened}
                            task={{name, id}}/> 
                        : null}
                </form>
            </FormProvider>
        </div>
    );
}

export default TaskPopup;