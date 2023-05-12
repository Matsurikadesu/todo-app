import './board.scss';
import BoardColumn from '../board-column/BoardColumn';
import { useContext } from 'react';
import dataContext from '../../context';

const Board = ({boards, currentBoard}) =>{
    const current = boards[currentBoard].columns; 
    const {state, setState} = useContext(dataContext);

    const elements = current
        .map((item, index) => {

            return(
                <BoardColumn 
                    column={item} 
                    key={index}
                    id={index}/>
            )
        })

    const onAddMenuOpen = () => {
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
    const onGrab = (e) => {
        const board = document.querySelector('.board');
        const isColumn = e.target.classList.contains('board__column');
        const isTasksContainer = e.target.classList.contains('column__tasks');
        if(!(e.target === board || isColumn || isTasksContainer)) return;
        board.setAttribute('style', 'cursor: grab;');

        let currentX = e.clientX;
        let currentY = e.clientY;

        const onMouseMove = (e) => {
            const moveX = currentX - e.clientX;
            const moveY = currentY - e.clientY;
            currentX = e.clientX;
            currentY = e.clientY;
            board.scrollLeft += moveX;
            board.scrollTop += moveY;
        };

        const onMouseUp = function(){
            this.removeEventListener('mousemove', onMouseMove);
            this.removeEventListener('mouseup', onMouseUp);
            board.setAttribute('style', '');
        }

        board.addEventListener('mousemove', onMouseMove);
        board.addEventListener('mouseup', onMouseUp);
    }

    if(current.length === 0){
        return (
            <section className="board board_empty">
                <p className="board__empty-text">This board is empty. Create a new column to get started.</p>
                <button className="btn" onClick={onAddMenuOpen}>
                    <span className="btn-text">+ Add New Task</span>
                </button>
            </section>
        );
    }else{
        return (
            <section className="board" onMouseDown={onGrab}>
                {elements}
                <div className='board__column'>
                    <button className='board__column-btn' onClick={onAddMenuOpen}>+ New Column</button>
                </div>
            </section>
        );
    }; 
}

export default Board;