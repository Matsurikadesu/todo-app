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

    const onDelete = () =>{
        const oldData = state.data;
        let boards = oldData;

        if(state.menuTarget === 'Board'){
            if(oldData.boards.length === 1){
                return;
            }
    
            boards.boards = oldData.boards.filter((item) => (item !== oldData.boards[state.currentBoard]))
        }else if (state.menuTarget === 'Task'){
            boards = {
                boards: []
            }

            oldData.boards.forEach((item, index)=>{
                if(index === state.currentBoard){
                    item.columns.forEach((item) => {
                        item.tasks = item.tasks.filter(item => (item.title !== state.shownTask.title))
                    })
                }

                boards.boards.push(item);
            })
        }
        setState({
            ...state,
            data: boards,
            isEditMenuOpened: false,
            shownTask: null
        })
    }   

    return(
        <div className={`edit-menu edit-menu_${state.menuTarget}`}>
            <button className='edit-btn' onClick={onOpenEdit}>Edit {state.menuTarget}</button>
            <button className='edit-btn' onClick={onDelete}>Delete {state.menuTarget}</button>
        </div>
    )
}

export default EditMenu;