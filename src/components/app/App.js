import { Component } from 'react';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import data from '../../data';
import './App.scss';

class App extends Component{
    constructor(props){
        super(props)

        this.state = {
            currentBoard: '0',
            darkTheme: false,
            isEditBoardMenuOpened: false
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
                        onThemeChange={this.onThemeChange}/>
                </div>
            )
        }

    }
}

export default App;