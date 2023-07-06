import Board from '../app-board/app-board';
import Sidebar from '../app-sidebar/app-sidebar';


const Main = ({data, currentBoard}) => {
    return(
        <main className='main'>
            <Sidebar 
                {...data}/>
            <Board 
                {...data}
                currentBoard={currentBoard}/>
        </main>
    )
}

export default Main;