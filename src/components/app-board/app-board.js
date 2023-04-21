import { Component } from "react";
import './app-board.scss';
import Button from "../app-button/app-button";

class Board extends Component{
    render(){
        return(
            <section className="board">
                <p className="board__empty-text">This board is empty. Create a new column to get started.</p>
                <Button></Button>
            </section>
        )
    }
}

export default Board;