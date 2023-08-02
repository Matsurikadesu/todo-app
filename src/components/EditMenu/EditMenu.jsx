import { memo, useState } from 'react';
import ConfirmDeletePopup from '../ConfirmDeletePopup/ConfirmDeletePopup';
import './EditMenu.scss';

const EditMenu = memo(({target, setIsEditing, setIsEditMenuOpened, task}) => {
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

    const onOpenEdit = () =>{
        // target === 'Task' ? (() => {})() : setIsEditMenuOpened(false);
        setIsEditing(true);
    }

    return(
        <>
            <div className={`edit-menu edit-menu_${target}`}>
                <button className='edit-btn' onClick={onOpenEdit}>Edit {target}</button>
                <button className='edit-btn' onClick={() => setIsDeletePopupOpen(true)}>Delete {target}</button>
            </div>

            { isDeletePopupOpen 
                && <ConfirmDeletePopup 
                    target={target} 
                    setIsDeletePopupOpen={setIsDeletePopupOpen}
                    setIsEditMenuOpened={setIsEditMenuOpened}
                    task={task}/>
            }
        </>
    )
})

export default EditMenu;