import { Component } from 'react';
import './app-sidebar.scss';
import SidebarTools from "../sidebar-tools/sidebar-tools";
import SidebarButtons from "../sidebar-buttons/sidebar-buttons";
import HideSidebarBtn from '../sidebar-hide-btn/sidebar-hide';

//const Sidebar = ({boards}) =>{

class Sidebar extends Component{
    constructor(props){
        super(props);

        this.state = {
            isHidden: false,
            boardCount: this.props.boards.length
        }
    }

    onToggleState = () => {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }


    render(){
        const {boards} = this.props;

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
                    <p className="sidebar__boards-count">All Boards ({this.state.boardCount})</p>
                    <SidebarButtons 
                        boards={boards}/>
                    <SidebarTools 
                        hidden={false} 
                        onToggleState={this.onToggleState}/>
                </div>
            );
        }

    }
}

export default Sidebar;