import { Component } from 'react';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import data from '../../data';
import TaskPopup from '../task-popup/task-popup';
import EditPopup from '../edit-popup/edit-popup';
import './App.scss';

class App extends Component{
    constructor(props){
        super(props)

        this.state = {
            currentBoard: '0',
            darkTheme: false,
            isEditMenuOpened: false,
            shownTask: null,
            menuTarget: null,
            currentColumn: '0',
            edit: null,
            data: data 
        }
    }

    onThemeChange = () => {
        const theme = this.state.darkTheme;

        this.setState({
            darkTheme: !theme
        })
    }

    onBoardSelect = (e) => {
        this.setState({
            currentBoard: e.target.id
        })
    }

    onSelectTask = (e) => {
        const title = e.target.closest('.column__task').children[0].textContent;
        const column = e.target.closest('.board__column').getAttribute('data-id')
        const columnTasks = this.state.data.boards[this.state.currentBoard].columns[column].tasks;

        const task = columnTasks.filter(element => {
            if(element.title === title){
                return element;
            }else{
                return null;
            }
        })[0];

        this.setState({
            shownTask: task,
            isEditMenuOpened: false
        })
    }

    onPopupExit = (e) => {
        if(e.target.classList.contains('popup')){
            this.setState({
                shownTask: null,
                edit: null,
                menuTarget: null,
                isEditMenuOpened: false
            })
        }
    }
    
    onEditMenuOpen = (e) => {
        const current = this.state.isEditMenuOpened;
        const openMenuTarget = e.target.closest('button[data-menu-target]').getAttribute('data-menu-target');

        this.setState({
            isEditMenuOpened: !current,
            menuTarget: openMenuTarget
        })
    }

    onOpenEdit = () =>{
        this.setState({
            edit: this.state.menuTarget,
            isEditMenuOpened: false
        })
    }

    onDelete = () =>{
        const oldData = this.state.data;
        let boards = oldData;

        if(this.state.menuTarget === 'Board'){
            if(oldData.boards.length === 1){
                return;
            }
    
            boards.boards = oldData.boards.filter((item) =>{
                if(item === oldData.boards[this.state.currentBoard]){
                    return null;
                }
                return item;
            })
        }else if (this.state.menuTarget === 'Task'){
            boards = {
                boards: []
            }

            oldData.boards.forEach((item, index)=>{
                if(String(index) === this.state.currentBoard){
                    item.columns.forEach((item) => {
                        item.tasks = item.tasks.filter(item => {
                            if(item.title === this.state.shownTask.title){
                                return null;
                            }
                            return item;
                        })
                    })
                }

                boards.boards.push(item);
            })
        }

        this.setState({
            data: boards,
            isEditMenuOpened: false,
            shownTask: null
        })
    }   

    onEditSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const oldData = this.state.data;
        if(this.state.menuTarget === 'Board'){
            const boards = oldData.boards.map((item, index) => {
                if(String(index) === this.state.currentBoard){
                    item.name = form[0].value;

                    let index = 1;
                    item.columns.forEach((item) => {
                        item.name = form[index].value;
                        index = index + 2;
                    })
                }
                return item;
            })

            this.setState({
                data: {boards},
                edit: null
            })
        }

    }

    render(){
        let classNames = 'body';
        if(this.state.darkTheme){
            classNames += ' dark'; 
        }

        const EditMenu = ({menuTarget}) => {
            if(this.state.isEditMenuOpened){
                return(
                    <div className={`edit-menu edit-menu_${menuTarget}`}>
                        <button className='edit-btn' onClick={this.onOpenEdit}>Edit {menuTarget}</button>
                        <button className='edit-btn' onClick={this.onDelete}>Delete {menuTarget}</button>
                    </div>
                )
            }else{
                return <></>;
            }
        }

        return(
            <div className={classNames}>
                <AppHeader 
                    {...this.state.data} 
                    onEditMenuOpen={this.onEditMenuOpen}
                    currentBoard={this.state.currentBoard}/>
                <Main 
                    data={this.state.data} 
                    currentBoard={this.state.currentBoard} 
                    onBoardSelect={this.onBoardSelect} 
                    onThemeChange={this.onThemeChange}
                    onSelectTask={this.onSelectTask}/>
                <EditPopup
                    onEditSubmit={this.onEditSubmit}
                    onEdit={this.onEdit}
                    edit={this.state.edit}
                    onPopupExit={this.onPopupExit}
                    shownTask={this.state.shownTask}
                    currentBoard={this.state.data.boards[this.state.currentBoard]}/>
                <TaskPopup 
                    shownTask={this.state.shownTask}
                    onEditMenuOpen={this.onEditMenuOpen}
                    onOpenEdit={this.onOpenEdit}
                    onPopupExit={this.onPopupExit}/>
                <EditMenu 
                    menuTarget={this.state.menuTarget}/>
            </div>
        )
    }
}

export default App;