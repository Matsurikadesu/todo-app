import { useContext, useState } from 'react';
import AppHeader from '../Header/Header';
import Board from '../Board/Board';
import Sidebar from '../Sidebar/Sidebar';
import data from '../../data';
import TaskPopup from '../TaskPopup/TaskPopup';
import EditPopupTask from '../EditPopup/EditPopupTask';
import EditPopupBoard from '../EditPopup/EditPopupBoard';
import ConfirmDeletePopup from '../ConfirmDeletePopup/ConfirmDeletePopup';
import AddPopup from '../Add-popup/AddPopup';
import AddBoardPopup from '../Add-popup/AddBoardPopup';
import './App.scss';
import { DataProvider } from '../../context';
import Main from '../Main/Main';
// const initialData = data;
// let theme = localStorage.theme === 'true' ? true : false;

const App = () => {
    const [darkTheme, setDarkTheme] = useState(false);

    const onPopupExit = (e) => {
        if((e.target.classList.contains('popup')) || (e.target.classList.contains('confirm-popup'))){
            // setState({
            //     ...state,
            //     shownTask: null,
            //     edit: null,
            //     isEditMenuOpened: false,
            //     add: null,
            //     delete: false
            // });
            console.log('popupClosen')
        }
    }


    // const EditPopup = () => {
    //     if(state.edit === 'Task'){
    //         return(
    //             <EditPopupTask 
    //                 onPopupExit={onPopupExit}/>
    //         )
    //     } else if(state.edit === 'Board'){
    //         return(
    //             <EditPopupBoard 
    //                 onPopupExit={onPopupExit}/>
    //         )
    //     }
    // }

    return(
        <div className={darkTheme ? 'body dark' : 'body'}>
            <DataProvider setTheme={setDarkTheme} theme={darkTheme}>
                <AppHeader/>
                <Main/>

                {/* {edit ? <EditPopup/> : null}

                {shownTask && !state.delete ? <TaskPopup
                    isEditMenuOpened={isEditMenuOpened}/> 
                    : null}

                {add === 'Task' ? <AddPopup
                        onPopupExit={onPopupExit}/> : null}
                {add === 'Board' ? <AddBoardPopup
                        onPopupExit={onPopupExit}/> : null}
                {state.delete ? <ConfirmDeletePopup
                    onPopupExit={onPopupExit}/> : null} */}
            </DataProvider>
        </div>
    )
}

export default App;