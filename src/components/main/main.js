import { useContext } from 'react';
import Board from '../app-board/app-board';
import Sidebar from '../app-sidebar/app-sidebar';
import dataContext from '../../context';


const Main = ({data, currentBoard}) => {
    const {state, setState} = useContext(dataContext);
    const onAddMenuOpen = (e) => {
        const add = e.target.getAttribute('data-add');
        const oldData = data;
        let boards ={};

        if(add === 'column'){
            boards = oldData.boards.map((item,index) => {
                if(index === +currentBoard){
                    item.columns.push({name: 'New Column', tasks: []})
                }
                return item;
            })
        }else if(add === 'board'){
            boards = JSON.parse(JSON.stringify(oldData)).boards;
            boards.push({name: "New Board", columns: []});
        }
        setState({
            ...state,
            data: {boards},
            add: null
        })
    }

    return(
        <main className='main'>
            <Sidebar 
                {...data} 
                onAddMenuOpen={(e) => onAddMenuOpen(e)}/>
            <Board 
                {...data} 
                onAddMenuOpen={(e) => onAddMenuOpen(e)}
                currentBoard={currentBoard}/>
        </main>
    )
}

export default Main;