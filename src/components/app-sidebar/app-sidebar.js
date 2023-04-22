import './app-sidebar.scss';
import SidebarTools from "../sidebar-tools/sidebar-tools";
import SidebarButtons from "../sidebar-buttons/sidebar-buttons";

const Sidebar = ({boards}) =>{
    const boardsCount = boards.length;

    return(
        <div className="sidebar">
            <p className="sidebar__boards-count">All Boards ({boardsCount})</p>
            <SidebarButtons boards={boards}/>
            <SidebarTools />
        </div>
    );
}

export default Sidebar;