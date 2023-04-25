import '../task-popup/task-popup.scss';
import './edit-popup.scss';

const EditPopup = ({edit, onPopupExit, shownTask, currentBoard}) => {
    if(edit === 'Task'){
        const {title, description, subtasks} = shownTask;

        const elements = subtasks.map((item, index) => {
            return(
                <div className='card__subtask-input' key={index}>
                    <input className='popup__input-field' type="text" defaultValue={item.title}/>
                    <button className='card__subtask-delete'>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="12.7275" width="3" height="18" transform="rotate(45 12.7275 0)" fill="#828FA3"/>
                            <rect y="2.12132" width="3" height="18" transform="rotate(-45 0 2.12132)" fill="#828FA3"/>
                        </svg>
                    </button>
                </div>
            )
        })

        return(
            <div className='popup' onClick={onPopupExit}>
                <form className="popup__card">
                    <h3 className='popup__title'>Edit {edit}</h3>
                    <div className='popup__input'>
                        <label htmlFor="title" className='text-m'>Title</label>
                        <input className='popup__input-field' id='title' type="text" name='title' required defaultValue={title}/>
                    </div>
                    <div className='popup__input'>
                        <label htmlFor="description" className='text-m'>Description</label>
                        <textarea className='popup__input-field' id='description' name='description' type="text" placeholder='e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little.' defaultValue={description}/>
                    </div>
                    <div className='popup__input'>
                        <p className='text-m'>Subtasks</p>
                        <div className='card__subtasks'>
                            {elements}
                        </div>
                        <button className='popup__btn'>+ Add New Subtask</button>
                    </div>
                    <div className='popup__input'>
                        <p className='text-m'>Status</p>
                        <select className='card__status-select' name="" id="">
                            <option value="1">Todo</option>
                            <option value="2">Doing</option>
                            <option value="3">Done</option>
                        </select>
                    </div>
                    <button className='popup__btn submit-btn'>Save Changes</button>
                </form>
            </div>
        )
    } else if(edit === 'Board'){
        const {name, columns} = currentBoard;
        
        const elements = columns.map((item, index) =>{
            return (
                <div className='card__subtask-input' key={index}>
                    <input className='popup__input-field' type="text" defaultValue={item.name}/>
                    <button className='card__subtask-delete'>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="12.7275" width="3" height="18" transform="rotate(45 12.7275 0)" fill="#828FA3"/>
                            <rect y="2.12132" width="3" height="18" transform="rotate(-45 0 2.12132)" fill="#828FA3"/>
                        </svg>
                    </button>
                </div>
            )
        })

        return (
            <div className='popup' onClick={onPopupExit}>
                <form className='popup__card'>
                    <h3 className='popup__title'>Edit {edit}</h3>
                    <div className='popup__input'>
                        <label htmlFor="title" className='text-m'>Title</label>
                        <input className='popup__input-field' id='title' type="text" name='title' required defaultValue={name}/>
                    </div>
                    <div className='popup__input'>
                        {elements}
                        <button className='popup__btn'>+ Add New Column</button>
                    </div>
                    <button className='popup__btn submit-btn'>Save Changes</button>
                </form>
            </div>
        )
    } else{
        return <></>
    }
}

export default EditPopup;