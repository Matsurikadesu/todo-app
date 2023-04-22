import { Component } from 'react';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import data from '../../data';

class App extends Component{
    constructor(props){
        super(props)

        this.state = {
            currentBoard: '0'
        }
    }

    onBoardSelect = (e) => {
        this.setState({
            currentBoard: e.target.id
        })
    }

    render(){
        return(
            <>
                <AppHeader {...data} currentBoard={this.state.currentBoard}/>
                <Main data={data} onBoardSelect={this.onBoardSelect} currentBoard={this.state.currentBoard}/>
            </>
        )
    }
}

export default App;