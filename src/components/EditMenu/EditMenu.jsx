import dataContext from "../../context";
import { useContext } from "react";
import './EditMenu.scss';

const EditMenu = ({target, setIsEditing, setIsOpened}) => {
    const onOpenEdit = () =>{
        setIsEditing(true);
        setIsOpened(false);
    }

    const onDelete = () => {
        console.log('tasks deleted')
    }

    return(
        <div className={`edit-menu edit-menu_${target}`}>
            <button className='edit-btn' onClick={onOpenEdit}>Edit {target}</button>
            <button className='edit-btn' onClick={onDelete}>Delete {target}</button>
        </div>
    )
}

export default EditMenu;