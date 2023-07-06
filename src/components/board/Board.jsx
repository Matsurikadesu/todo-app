import './board.scss';
import BoardColumn from '../BoardColumn/BoardColumn';
import {  useEffect, useState } from 'react';
import { handleGrab } from './handleGrab';
import { db } from '../../firebase';
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useContext } from 'react';
import dataContext from '../../context';

const Board = () =>{
    const { boardId, currentBoard } = useContext(dataContext);
    const [tasks, setTasks] = useState([]);

    const columnsElements = currentBoard.columns
        .map((column) => {
            const tasksInColumn = tasks.filter(task => task.status === column.name)

            return(
                <BoardColumn 
                    name={column.name} 
                    key={column.id}
                    id={column.id}
                    tasks={tasksInColumn}/>
            )
        })

    /** Функция получает от сервера  массив с именами колонок и массив tasks, формирует из этих массивов обьект и помещает его в state*/
    async function fetchTasks(){
        const ref = query(collection(db, 'boards', boardId, 'tasks'), orderBy('timestamp'));
        await getDocs(ref)
        .then((querySnapshot) => {
            const newTasks = querySnapshot.docs.map((item) => ({...item.data(), id: item.id}));
            setTasks(newTasks);
        });
    }

    useEffect(() => {
        fetchTasks();
    }, [boardId])
    

    const onAddMenuOpen = () => {
        console.log('adding chto-to')
        // const oldData = state.data;
        // const boards = oldData.boards.map((item,index) => {
        //     if(index === +currentBoard){
        //         item.columns.push({name: 'New Column', tasks: []})
        //     }
        //     return item;
        // })
        
        // setState({
        //     ...state,
        //     data: {boards}
        // })
    }

    if(currentBoard.columns.length === 0){
        return (
            <section className="board board_empty">
                <p className="board__empty-text">This board is empty. Create a new column to get started.</p>
                <button className="btn" onClick={onAddMenuOpen}>
                    <span className="btn-text">+ Add New Column</span>
                </button>
            </section>
        );
    }else{
        return (
            <section className="board" onMouseDown={handleGrab}>
                {columnsElements}
                <div className='board__column'>
                    <button className='board__column-btn' onClick={onAddMenuOpen}>+ New Column</button>
                </div>
            </section>
        );
    }; 
}

export default Board;