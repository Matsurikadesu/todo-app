import { useState } from 'react';
import AppHeader from '../header/header';
import Board from '../board/Board';
import Sidebar from '../sidebar/sidebar';
import data from '../../data';
import TaskPopup from '../task-popup/taskPopup';
import EditPopupTask from '../EditPopup/EditPopupTask';
import EditPopupBoard from '../EditPopup/EditPopupBoard';
import AddPopup from '../add-popup/AddPopup';
import './App.scss';
import dataContext from '../../context';

const {Provider} = dataContext;
const initialData = data;

const App = () => {
    const [state, setState] = useState({
        currentBoard: 0,
        currentColumn: 0,
        darkTheme: false,
        isEditMenuOpened: false,
        shownTask: null,
        menuTarget: null,
        edit: null,
        data: initialData,
        add: null
    });

    const {currentBoard, darkTheme, shownTask, edit, data, menuTarget, isEditMenuOpened, add} = state;

    const onPopupExit = (e) => {
        if(e.target.classList.contains('popup')){
            setState({
                ...state,
                shownTask: null,
                edit: null,
                menuTarget: null,
                isEditMenuOpened: false,
                add: null
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

                {shownTask ? <TaskPopup 
                    onPopupExit={onPopupExit}
                    shownTask={shownTask}
                    isEditMenuOpened={isEditMenuOpened}
                    menuTarget={menuTarget}/> 
                    : null}

                {add === 'Task' ? <AddPopup
                        onPopupExit={onPopupExit}/> : null}
            </Provider>
        </div>
    )
}

export default App;