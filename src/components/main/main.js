import Board from '../app-board/app-board';
import Sidebar from '../app-sidebar/app-sidebar';


const Main = ({data, onBoardSelect, currentBoard, onThemeChange, onSelectTask}) => {
    return(
        <main className='main'>
            <Sidebar 
                {...data} 
                currentBoard={currentBoard} 
                onThemeChange={onThemeChange}
                onBoardSelect={(e) => onBoardSelect(e)}/>
            <Board 
                {...data} 
                currentBoard={currentBoard}
                onSelectTask={onSelectTask}/>
        </main>
    )
}

export default Main;