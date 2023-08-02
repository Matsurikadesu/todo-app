import './board.scss';
import BoardColumn from '../BoardColumn/BoardColumn';
import { useEffect, useState } from 'react';
import { handleGrab } from './handleGrab';
import { useContext } from 'react';
import dataContext from '../../context/context';
import { fetchTasks, updateDocInDatabase } from '../../services';

const Board = () =>{
    const { currentBoard } = useContext(dataContext);
    const [tasks, setTasks] = useState([]);

    const columnsElements = currentBoard.columns
        .map((column) => {
            const tasksInColumn = tasks.filter(task => task.status === column.name)

            return(
                <BoardColumn 
                    name={column.name} 
                    key={column.id}
                    tasks={tasksInColumn}/>
            )
        })

    useEffect(() => {
        fetchTasks(`boards/${currentBoard.id}/tasks`, setTasks);
        // eslint-disable-next-line
    }, [currentBoard.id])
    

    const handleAddNewColumnClick = () => {
        const newColumns = currentBoard.columns.map(item => item);
        newColumns.push({name: 'new column', id: newColumns.length});
        updateDocInDatabase(`boards/${currentBoard.id}`, {columns: newColumns});
    }

    if(currentBoard.columns.length === 0){
        return (
            <section className="board board_empty">
                <p className="board__empty-text">This board is empty. Create a new column to get started.</p>
                <button className="btn" onClick={handleAddNewColumnClick}>
                    <span className="btn-text">+ Add New Column</span>
                </button>
            </section>
        );
    }else{
        return (
            <section className="board" onMouseDown={handleGrab}>
                {columnsElements}
                <div className='board__column'>
                    <button className='board__column-btn' onClick={handleAddNewColumnClick}>+ New Column</button>
                </div>
            </section>
        );
    }; 
}

export default Board;