import './task-popup.scss';

const TaskPopup = ({shownTask, onPopupExit}) => {
    if(shownTask != null){
        const {title, description, status, subtasks} = shownTask;
        let completedSubtasksCount = 0;
        let isHidden = false;

        if (!description){
            isHidden = true;
        }

        const elements = subtasks
            .map((item, index) => {
                if(item.isCompleted){
                    completedSubtasksCount++;
                }

                return(
                    <li className='card__subtasks-item' key={index}>
                        <input className='card__subtasks-checkbox' type="checkbox" defaultChecked={item.isCompleted}/>
                        <span className='card__subtasks-label'>{item.title}</span>
                    </li>
                )
            })

        return(
            <div className='popup' onClick={onPopupExit}>
                <div className="popup__card">
                    <h3 className='card__title'>{title}</h3>
                    <h4 className='card__subtitle' hidden={isHidden}>{description}</h4>
                    <div className='card__subtasks'>
                        <p className='card__subtasks-count'>Subtasks ({completedSubtasksCount} of {subtasks.length})</p>
                        <ul className='card__subtasks-list'>
                            {elements}
                        </ul>
                    </div>
                    <div className='card__status'>
                        <h4 className='card__status-text'>Current Status</h4>
                        <select className='card__status-select' name="" id="">
                            <option value="1">{status}</option>
                            <option value="2">Doing</option>
                            <option value="3">Done</option>
                        </select>
                    </div>
                </div>
            </div>
        );
    }else{
        return <></>;
    }
}

export default TaskPopup;