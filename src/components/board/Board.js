import './board.scss';
import Button from "../button/button";
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

    if(current.length === 0){
        return (
            <section className="board board_empty">
                <p className="board__empty-text">This board is empty. Create a new column to get started.</p>
                <Button />
            </section>
        );
    }else{
        return (
            <section className="board">
                {elements}
                <div className='board__column'>
                    <button className='board__column-btn' onClick={onAddMenuOpen}>+ New Column</button>
                </div>
            </section>
        );
    }; 
}

export default Board;