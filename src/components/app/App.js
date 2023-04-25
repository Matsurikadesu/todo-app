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
            edit: null 
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
        const columnTasks = data.boards[this.state.currentBoard].columns[column].tasks;

        const task = columnTasks.filter(element => {
            if(element.title === title){
                return element;
            }else{
                return null;
            }
        })[0];

        this.setState({
            shownTask: task,
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
                        <button className='edit-btn'>Delete {menuTarget}</button>
                    </div>
                )
            }else{
                return <></>;
            }
        }

        return(
            <div className={classNames}>
                <AppHeader 
                    {...data} 
                    onEditMenuOpen={this.onEditMenuOpen}
                    currentBoard={this.state.currentBoard}/>
                <Main 
                    data={data} 
                    currentBoard={this.state.currentBoard} 
                    onBoardSelect={this.onBoardSelect} 
                    onThemeChange={this.onThemeChange}
                    onSelectTask={this.onSelectTask}/>
                <EditPopup
                    onEdit={this.onEdit}
                    edit={this.state.edit}
                    onPopupExit={this.onPopupExit}
                    shownTask={this.state.shownTask}
                    currentBoard={data.boards[this.state.currentBoard]}/>
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