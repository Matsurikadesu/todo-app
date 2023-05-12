import dataContext from "../../context";
import { useContext } from "react";
import './EditMenu.scss';

const EditMenu = () => {
    const {state, setState} = useContext(dataContext);

    const onOpenEdit = () =>{
        setState({
            ...state,
            edit: state.menuTarget,
            isEditMenuOpened: false
        });
    }
    
    const onDeleteBoard = () => {
        const oldData = state.data;
        if(oldData.length <= 1) return;
        const boards = oldData.boards.filter((item, index) => (index !== +state.currentBoard))
        
        setState({
            ...state,
            data: {boards},
            isEditMenuOpened: false,
            currentBoard: 0
        })
    }

    const onDeleteTask = () => {
        const boards = [];
        state.data.boards.forEach((item, index) => {
            if(index === state.currentBoard){
                item.columns.forEach((item) => {
                    item.tasks = item.tasks.filter(item => (item.title !== state.shownTask.title));
                })
            }
            boards.push(item);
        })

        setState({
            ...state,
            data: {boards},
            isEditMenuOpened: false,
            shownTask: null
        })
    }

    return(
        <div className={`edit-menu edit-menu_${state.menuTarget}`}>
            <button className='edit-btn' onClick={onOpenEdit}>Edit {state.menuTarget}</button>
            <button className='edit-btn' onClick={state.menuTarget === 'Board' ? onDeleteBoard : onDeleteTask}>Delete {state.menuTarget}</button>
        </div>
    )
}

export default EditMenu;