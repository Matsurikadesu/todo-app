import dataContext from "../../context";
import { useContext } from "react";
import './EditMenu.scss';

const EditMenu = () => {
    const {menuTarget, onOpenEdit, onDelete} = useContext(dataContext);

    return(
        <div className={`edit-menu edit-menu_${menuTarget}`}>
            <button className='edit-btn' onClick={onOpenEdit}>Edit {menuTarget}</button>
            <button className='edit-btn' onClick={onDelete}>Delete {menuTarget}</button>
        </div>
    )
}

export default EditMenu;