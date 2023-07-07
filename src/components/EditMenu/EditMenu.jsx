import './EditMenu.scss';

const EditMenu = ({target, setIsEditing, setIsOpened, setIsEditMenuOpened}) => {
    const onOpenEdit = () =>{
        if(target === 'Task') setIsOpened(false);
        if(target === 'Board') setIsEditMenuOpened(false);
        setIsEditing(true);
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