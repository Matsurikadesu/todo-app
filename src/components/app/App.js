import { useState } from 'react';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import data from '../../data';
import TaskPopup from '../task-popup/task-popup';
import EditPopup from '../edit-popup/edit-popup';
import './App.scss';
import dataContext from '../../context';

const {Provider} = dataContext;
const initialData = data;

const App = () => {
    const [currentBoard, setCurrentBoard] = useState('0');
    const [darkTheme, setDarkTheme] = useState(false);
    const [isEditMenuOpened, setEditMenuStatus] = useState(false);
    const [shownTask, setShownTask] = useState(null);
    const [menuTarget, setMenuTarget] = useState(null);
    const [add, setAdd] = useState(null);
    const [edit, setEdit] = useState(null);
    const [data, setData] = useState(initialData);
    

    const onThemeChange = () => {
        setDarkTheme(!darkTheme);
    }

    const onBoardSelect = (e) => {
        setCurrentBoard(e.target.id);
    }

    const onSelectTask = (e) => {
        const title = e.target.closest('.column__task').children[0].textContent;
        const column = e.target.closest('.board__column').getAttribute('data-id')
        const columnTasks = data.boards[currentBoard].columns[column].tasks;

        const task = columnTasks.filter(element => (element.title === title))[0];

        setShownTask(task);
        setEditMenuStatus(false);
    }

    const onPopupExit = (e) => {
        if(e.target.classList.contains('popup')){
            setShownTask(null);
            setEdit(null);
            setMenuTarget(null);
            setEditMenuStatus(false);
        }
    }
    
    const onEditMenuOpen = (e) => {
        const openMenuTarget = e.target.closest('button[data-menu-target]').getAttribute('data-menu-target');
        setEditMenuStatus(!isEditMenuOpened);
        setMenuTarget(openMenuTarget);
    }

    const onOpenEdit = () =>{
        setEdit(menuTarget);
        setEditMenuStatus(false);
    }

    const onDelete = () =>{
        const oldData = data;
        let boards = oldData;

        if(menuTarget === 'Board'){
            if(oldData.boards.length === 1){
                return;
            }
    
            boards.boards = oldData.boards.filter((item) => (item !== oldData.boards[currentBoard]))
        }else if (menuTarget === 'Task'){
            boards = {
                boards: []
            }

            oldData.boards.forEach((item, index)=>{
                if(String(index) === currentBoard){
                    item.columns.forEach((item) => {
                        item.tasks = item.tasks.filter(item => (item.title !== shownTask.title))
                    })
                }

                boards.boards.push(item);
            })
        }
        setData(boards);
        setEditMenuStatus(false);
        setShownTask(null);
    }   

    const onEditSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const oldData = data;
        if(menuTarget === 'Board'){
            const boards = oldData.boards.map((item, index) => {
                if(String(index) === currentBoard){
                    item.name = form[0].value;

                    let index = 1;
                    item.columns.forEach((item) => {
                        item.name = form[index].value;
                        index = index + 2;
                    })
                }
                return item;
            })
            setData({boards});
            setEdit(null);
        }else if(menuTarget === 'Task'){
            const boards = oldData.boards.map((item, index) =>{
                if(String(index) === currentBoard){
                    item.columns.forEach(item => {
                        item.tasks = item.tasks.filter(item => {
                            if(item.title === shownTask.title){
                                item.title = form[0].value;
                                item.description = form[1].value;
                                let index = 2;
                                
                                item.subtasks.forEach((item) => {
                                    item.title = form[index].value;
                                    index += 2;
                                })
                            }
                            return item;
                        })
                    })
                }
                return item;
            })
            setData({boards});
            setEdit(null);
        }
    }

    const onAddMenuOpen = (e) => {
        const add = e.target.getAttribute('data-add');
        const oldData = data;
        let boards ={};

        if(add === 'column'){
            boards = oldData.boards.map((item,index) => {
                if(String(index) === currentBoard){
                    item.columns.push({name: 'New Column', tasks: []})
                }
                return item;
            })
        }else if(add === 'board'){
            boards = JSON.parse(JSON.stringify(oldData)).boards;
            boards.push({name: "New Board", columns: []});
        }
        setAdd(add);
        setData({boards});
    }

    return(
        <div className={darkTheme ? 'body dark' : 'body'}>
            <Provider value = {{menuTarget, isEditMenuOpened, onDelete, onOpenEdit}}>
                <AppHeader 
                    {...data} 
                    onEditMenuOpen={onEditMenuOpen}
                    currentBoard={currentBoard}/>
                <Main 
                    data={data} 
                    currentBoard={currentBoard} 
                    onBoardSelect={onBoardSelect} 
                    onThemeChange={onThemeChange}
                    onAddMenuOpen={onAddMenuOpen}
                    onSelectTask={onSelectTask}/>
                {edit ? <EditPopup
                    add={add}
                    onEditSubmit={onEditSubmit}
                    edit={edit}
                    onPopupExit={onPopupExit}
                    shownTask={shownTask}
                    currentBoard={data.boards[currentBoard]}/> : null}
                {shownTask ? <TaskPopup 
                    shownTask={shownTask}
                    onEditMenuOpen={onEditMenuOpen}
                    onOpenEdit={onOpenEdit}
                    onPopupExit={onPopupExit}/> : null}
            </Provider>
        </div>
    )
}

export default App;