import dataContext from "../../context";
import { useContext } from "react";
import './EditMenu.scss';

const EditMenu = ({target}) => {
    const onOpenEdit = () =>{
        console.log('edit opened')
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