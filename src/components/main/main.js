import Board from '../app-board/app-board';
import Sidebar from '../app-sidebar/app-sidebar';


const Main = ({data, onBoardSelect, currentBoard, onThemeChange, onSelectTask, onAddMenuOpen}) => {
    return(
        <main className='main'>
            <Sidebar 
                {...data} 
                currentBoard={currentBoard} 
                onThemeChange={onThemeChange}
                onAddMenuOpen={(e) => onAddMenuOpen(e)}
                onBoardSelect={(e) => onBoardSelect(e)}/>
            <Board 
                {...data} 
                onAddMenuOpen={(e) => onAddMenuOpen(e)}
                currentBoard={currentBoard}
                onSelectTask={onSelectTask}/>
        </main>
    )
}

export default Main;