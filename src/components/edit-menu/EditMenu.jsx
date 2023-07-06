import dataContext from "../../context";
import { useContext } from "react";
import './EditMenu.scss';

const EditMenu = ({target}) => {
    const {state, setState} = useContext(dataContext);

    const onOpenEdit = () =>{
        setState({
            ...state,
            edit: target,
            isEditMenuOpened: false
        });
    }

    const onDelete = () => {
        setState({
            ...state,
            delete: true
        })
    }

    return(
        <div className={`edit-menu edit-menu_${target}`}>
            <button className='edit-btn' onClick={onOpenEdit}>Edit {target}</button>
            <button className='edit-btn' onClick={onDelete}>Delete {target}</button>
        </div>
    )
}

export default EditMenu;