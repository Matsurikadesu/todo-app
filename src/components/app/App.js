import { useState } from 'react';
import AppHeader from '../header/header';
import Board from '../board/Board';
import Sidebar from '../sidebar/sidebar';
import data from '../../data';
import TaskPopup from '../task-popup/taskPopup';
import EditPopupTask from '../EditPopup/EditPopupTask';
import EditPopupBoard from '../EditPopup/EditPopupBoard';
import ConfirmDeletePopup from '../confirm-delete-popup/ConfirmDeletePopup';
import AddPopup from '../add-popup/AddPopup';
import AddBoardPopup from '../add-popup/AddBoardPopup';
import './App.scss';
import dataContext from '../../context';

const {Provider} = dataContext;
const initialData = data;
let theme = localStorage.theme === 'true' ? true : false;

const App = () => {
    const [state, setState] = useState({
        currentBoard: 0,
        currentColumn: 0,
        darkTheme: theme,
        isEditMenuOpened: false,
        shownTask: null,
        edit: null,
        data: initialData,
        add: null,
        delete: false
    });

    const {currentBoard, darkTheme, shownTask, edit, data, isEditMenuOpened, add} = state;

    const onPopupExit = (e) => {
        if((e.target.classList.contains('popup')) || (e.target.classList.contains('confirm-popup'))){
            setState({
                ...state,
                shownTask: null,
                edit: null,
                isEditMenuOpened: false,
                add: null,
                delete: false
            });
        }
    }

    const EditPopup = () => {
        if(state.edit === 'Task'){
            return(
                <EditPopupTask 
                    onPopupExit={onPopupExit}/>
            )
        } else if(state.edit === 'Board'){
            return(
                <EditPopupBoard 
                    onPopupExit={onPopupExit}/>
            )
        }
    }

    return(
        <div className={darkTheme ? 'body dark' : 'body'}>
            <Provider value = {{state, setState}}>
                <AppHeader 
                    {...data}/>

                <main className='main'>
                    <Sidebar 
                        {...data}/>
                    <Board 
                        {...data}
                        currentBoard={currentBoard}/>
                </main>

                {edit ? <EditPopup/> : null}

                {shownTask && !state.delete ? <TaskPopup 
                    onPopupExit={onPopupExit}
                    shownTask={shownTask}
                    isEditMenuOpened={isEditMenuOpened}/> 
                    : null}

                {add === 'Task' ? <AddPopup
                        onPopupExit={onPopupExit}/> : null}
                {add === 'Board' ? <AddBoardPopup
                        onPopupExit={onPopupExit}/> : null}
                {state.delete ? <ConfirmDeletePopup
                    onPopupExit={onPopupExit}/> : null}
            </Provider>
        </div>
    )
}

export default App;