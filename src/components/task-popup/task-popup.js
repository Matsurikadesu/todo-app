import './task-popup.scss';

const TaskPopup = () => {
    return(
        <div className='popup'>
            <div className="popup__card">
                <h3 className='card__title'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, officiis!</h3>
                <h4 className='card__subtitle'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti ut dolores aspernatur est, dolore alias.</h4>
                <div className='card__subtasks'>
                    <p className='card__subtasks-count'>Subtasks(2 of 3)</p>
                    <ul className='card__subtasks-list'>
                        <li className='card-subtasks-item'>
                            <input type="checkbox" />
                            <span> Lorem ipsum dolor sit amet consectetur.</span>
                        </li>
                    </ul>
                </div>
                <div className='card__status'>
                    <h4 className='text'>Current Status</h4>
                    <select name="" id="">
                        <option value="1">Todo</option>
                        <option value="2">Doing</option>
                        <option value="3">Done</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default TaskPopup;