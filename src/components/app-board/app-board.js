import './app-board.scss';
import Button from "../app-button/app-button";
import BoardColumn from '../board-column/board-column';

const Board = ({boards}) =>{
    const currentBoard = boards[0].columns; 

    const elements = currentBoard
        .map((item, index) => {

            return(
                <BoardColumn column={item} key={index}/>
            )
        })

    if(currentBoard.columns === []){
        return (
            <section className="board">
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