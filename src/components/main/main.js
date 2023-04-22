import Board from '../app-board/app-board';
import Sidebar from '../app-sidebar/app-sidebar';


const Main = ({data, onBoardSelect, currentBoard}) => {
    return(
        <main className='main'>
            <Sidebar {...data} currentBoard={currentBoard} onBoardSelect={(e) => onBoardSelect(e)}/>
            <Board {...data} currentBoard={currentBoard}/>
        </main>
    )
}

export default Main;