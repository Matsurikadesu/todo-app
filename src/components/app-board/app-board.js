import './app-board.scss';
import Button from "../app-button/app-button";
import BoardColumn from '../board-column/board-column';

const Board = ({boards, currentBoard, onSelectTask}) =>{
    const current = boards[currentBoard].columns; 

    const elements = current
        .map((item, index) => {

            return(
                <BoardColumn 
                    column={item} 
                    key={index}
                    id={index}
                    onSelectTask={onSelectTask}/>
            )
        })

    if(current.columns === []){
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
            </section>
        );
    }; 
}

export default Board;