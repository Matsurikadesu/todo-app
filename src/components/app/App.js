import { Component } from 'react';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import data from '../../data';
import TaskPopup from '../task-popup/task-popup';
import './App.scss';

class App extends Component{
    constructor(props){
        super(props)

        this.state = {
            currentBoard: '0',
            darkTheme: false,
            isEditBoardMenuOpened: false,
            shownTask: null
        }
    }

    onEditMenuOpen = () => {
        const current = this.state.isEditBoardMenuOpened;

        this.setState({
            isEditBoardMenuOpened: !current
        })
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
            }
        })[0];

        this.setState({
            shownTask: task
        })
    }

    onPopupExit = (e) => {
        if(e.target.classList.contains('popup')){
            this.setState({
                shownTask: null
            })
        }
    }

    render(){
        let classNames = 'body';

        if(this.state.darkTheme){
            classNames += ' dark'; 
        }

        const EditMenu = () => {
            return(
                <div className='edit-menu'>
                    <button className='edit-btn'>Edit Board</button>
                    <button className='edit-btn'>Delete Board</button>
                </div>
            )
        }

        if(this.state.isEditBoardMenuOpened){
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
                        onThemeChange={this.onThemeChange}/>
                    <EditMenu/>
                    <TaskPopup
                        shownTask={this.state.shownTask}
                        onPopupExit={this.onPopupExit}/>
                </div>
            )
        }else{
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
                    <TaskPopup 
                        shownTask={this.state.shownTask}
                        onPopupExit={this.onPopupExit}/>
                </div>
            )
        }

    }
}

export default App;