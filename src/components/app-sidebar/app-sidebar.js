import { Component } from "react";
import './app-sidebar.scss';
import SidebarTools from "../sidebar-tools/sidebar-tools";
import SidebarButtons from "../sidebar-buttons/sidebar-buttons";

const boardsCount = 3;

const boards = [
    {title: 'Platform Launch', state: 'active', key: 1},
    {title: 'Marketing Plan', state: 'disabled', key: 2},
    {title: 'Roadmap', state: 'disabled', key: 3},
    {title: '+Create New Board', state: 'add', key: 4}
];

class Sidebar extends Component{

    render(){
        return(
            <div className="sidebar">
                <p className="sidebar__boards-count">All Boards ({boardsCount})</p>
                <SidebarButtons boards={boards}/>
                <SidebarTools />
            </div>
        );
    }
}

export default Sidebar;