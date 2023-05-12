import '../task-popup/taskPopup.scss';
import '../EditPopup/edit-popup.scss';
import { useContext } from 'react';
import { useState } from 'react';
import dataContext from '../../context';

const AddBoardPopup = ({onPopupExit}) => {
    const {state, setState} = useContext(dataContext); 
    const [columns, setColumns] = useState([{name: 'Todo'}, {name: 'Doing'}])
    
    const onBoardAddSubmit = (e) =>{
        e.preventDefault();
        const form = e.target;
        const boardColumns = [];
        columns.forEach((item, index) => {
            boardColumns.push({
                name: form[`column${index}`].value,
                tasks: []
            })
        })
        const board = {
            name: form.title.value,
            columns: boardColumns,
        }
        
        const boards = state.data.boards.splice(0);
        boards.push(board)
        
        setState({
            ...state,
            data: {boards},
            add: null
        })
    }

    const onAddColumn = (e) => {
        e.preventDefault();
        const newColumns = columns.splice(0);
        newColumns.push({name: 'New column', tasks: []})
        setColumns(newColumns)
    }

    const onColumnDelete = (e) => {
        e.preventDefault();
        const columnToDelete = +e.target.closest('.card__subtask-delete').getAttribute('index');
        const newColumns = columns.splice(0, columnToDelete).concat(columns.splice(columnToDelete))
        setColumns(newColumns);
    }
    
    const columnsElements = columns.map((item, index) =>{
        return (
            <div className='card__subtask-input' key={index}>
                <input className='popup__input-field' name={`column${index}`} type="text" placeholder='Column name' defaultValue={item.name}/>
                <button className='card__subtask-delete' index={index} onClick={onColumnDelete}>
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
            <form className='popup__card' onSubmit={onBoardAddSubmit}>
                <h3 className='popup__title'>Add Board</h3>
                <div className='popup__input'>
                    <label htmlFor="title" className='text-m'>Title</label>
                    <input className='popup__input-field' id='title' type="text" name='title' placeholder='e.g. Web Design' required/>
                </div>
                <div className='popup__input'>
                    {columnsElements}
                    <button className='popup__btn' onClick={onAddColumn}>+ Add New Column</button>
                </div>
                <button type='submit' className='popup__btn submit-btn'>Add Board</button>
            </form>
        </div>
    )
}

export default AddBoardPopup;