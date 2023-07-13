import { memo, useState } from 'react';
import ConfirmDeletePopup from '../ConfirmDeletePopup/ConfirmDeletePopup';
import './EditMenu.scss';

const EditMenu = memo(({target, setIsEditing, setIsOpened, setIsEditMenuOpened, task}) => {
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

    const onOpenEdit = () =>{
        if(target === 'Task') setIsOpened(false);
        if(target === 'Board') setIsEditMenuOpened(false);
        setIsEditing(true);
    }

    const onDelete = () => {
        setIsDeletePopupOpen(true);
    }

    return(
        <>
            <div className={`edit-menu edit-menu_${target}`}>
                <button className='edit-btn' onClick={onOpenEdit}>Edit {target}</button>
                <button className='edit-btn' onClick={onDelete}>Delete {target}</button>
            </div>

            {
                isDeletePopupOpen 
                    ? <ConfirmDeletePopup 
                        target={target} 
                        setIsDeletePopupOpen={setIsDeletePopupOpen}
                        task={task}/>
                    : null
            }
        </>
    )
})

export default EditMenu;