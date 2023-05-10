import { useState } from 'react';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import data from '../../data';
import TaskPopup from '../task-popup/taskPopup';
import EditPopup from '../edit-popup/edit-popup';
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
        add: null,
        edit: null,
        data: initialData
    });

    const {currentBoard, darkTheme, shownTask, edit, data, menuTarget, isEditMenuOpened} = state;

    const onPopupExit = (e) => {
        if(e.target.classList.contains('popup')){
            setState({
                ...state,
                shownTask: null,
                edit: null,
                menuTarget: null,
                isEditMenuOpened: false
            });
        }
    }

    return(
        <div className={darkTheme ? 'body dark' : 'body'}>
            <Provider value = {{state, setState}}>
                <AppHeader 
                    {...data} 
                    currentBoard={currentBoard}/>
                <Main 
                    data={data} 
                    currentBoard={currentBoard}/>
                {edit ? <EditPopup
                    onPopupExit={onPopupExit}
                    currentBoard={data.boards[currentBoard]}/> 
                    : null}
                {shownTask ? <TaskPopup 
                    onPopupExit={onPopupExit}
                    shownTask={shownTask}
                    isEditMenuOpened={isEditMenuOpened}
                    menuTarget={menuTarget}/> 
                    : null}
            </Provider>
        </div>
    )
}

export default App;