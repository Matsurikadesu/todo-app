import { Component } from 'react';
import './app-sidebar.scss';
import SidebarTools from "../sidebar-tools/sidebar-tools";
import SidebarButtons from "../sidebar-buttons/sidebar-buttons";
import HideSidebarBtn from '../sidebar-hide-btn/sidebar-hide';

class Sidebar extends Component{
    constructor(props){
        super(props);

        this.state = {
            isHidden: false
        }
    }

    onToggleState = () => {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }

    render(){
        const {boards, onBoardSelect, currentBoard, onThemeChange} = this.props;
        const boardCount = boards.length;

        if(this.state.isHidden){
            return(
                <div className='sidebar_hidden'>
                    <HideSidebarBtn
                        onToggleState={this.onToggleState} hidden={true}/>
                </div>
            )
        }else{
            return(
                <div className="sidebar">
                    <p className="sidebar__boards-count">All Boards ({boardCount})</p>
                    <SidebarButtons 
                        boards={boards}
                        currentBoard={currentBoard}
                        onBoardSelect={onBoardSelect}/>
                    <SidebarTools 
                        hidden={false} 
                        onToggleState={this.onToggleState}
                        onThemeChange={onThemeChange}/>
                </div>
            );
        }
    }
}

export default Sidebar;