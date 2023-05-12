import { useContext } from "react";
import dataContext from "../../context";
import '../task-popup/taskPopup.scss';
import './edit-popup.scss';

const EditPopupBoard = ({onPopupExit}) =>{
    const {state, setState} = useContext(dataContext);
    const {currentBoard, data} = state;
    const {name, columns} = data.boards[currentBoard];

    const onAddColumn = (e) => {
        e.preventDefault();
        const oldData = state.data;
        const boards = oldData.boards.map((item,index) => {
            if(index === +currentBoard){
                item.columns.push({name: 'New Column', tasks: []})
            }
            return item;
        })
        
        setState({
            ...state,
            data: {boards}
        })
    }

    const onBoardEditSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const oldData = data;
        const boards = oldData.boards.map((item, index) => {
            if(index === +currentBoard){
                item.name = form.title.value;

                let index = 1;
                item.columns.forEach((item) => {
                    item.name = form[index].value;
                    index = index + 2;
                })
            }
            return item;
        })
        setState({
            ...state,
            data: {boards},
            edit: null
        })
    }

    const onColumnDelete = (e) => {
        e.preventDefault();
        const target = +e.target.closest('button').getAttribute('id');
        const oldData = data;
        const boards = oldData.boards.map((item, index) => {
            if(index === +currentBoard){
                item.columns = item.columns.filter((item, index) => index !== target);
            }
            return item;
        })

        setState({
            ...state,
            data: {boards}
        })
    }

    const columnsElements = columns.map((item, index) =>{
        return (
            <div className='card__subtask-input' key={index}>
                <input className='popup__input-field' type="text" defaultValue={item.name}/>
                <button className='card__subtask-delete' id={index} onClick={onColumnDelete}>
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
            <form className='popup__card' onSubmit={onBoardEditSubmit}>
                <h3 className='popup__title'>Edit Board</h3>
                <div className='popup__input'>
                    <label htmlFor="title" className='text-m'>Title</label>
                    <input className='popup__input-field' id='title' type="text" name='title' required defaultValue={name}/>
                </div>
                <div className='popup__input'>
                    {columnsElements}
                    <button className='popup__btn' onClick={onAddColumn}>+ Add New Column</button>
                </div>
                <button type='submit' className='popup__btn submit-btn'>Save Changes?</button>
            </form>
        </div>
    )
}

export default EditPopupBoard;