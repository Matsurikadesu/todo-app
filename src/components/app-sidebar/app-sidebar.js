import { useState } from 'react';
import './app-sidebar.scss';
import SidebarTools from "../sidebar-tools/sidebar-tools";
import SidebarButtons from "../sidebar-buttons/sidebar-buttons";
import HideSidebarBtn from '../sidebar-hide-btn/sidebar-hide';

const Sidebar = ({boards, currentBoard, onAddMenuOpen}) => {
    const [isHidden, setIsHidden] = useState(false);

    const onToggleState = () => {
        setIsHidden(!isHidden);
    }

    const HiddenSidebar = () => {
        return(
            <div className='sidebar_hidden'>
                <HideSidebarBtn
                    onToggleState={onToggleState} 
                    hidden={true}/>
            </div>
        )
    }

    const VisibleSidebar = () => {
        return(
            <div className="sidebar">
                <p className="sidebar__boards-count">All Boards ({boards.length})</p>
                <SidebarButtons 
                    boards={boards}
                    onAddMenuOpen={(e) => onAddMenuOpen(e)}
                    currentBoard={currentBoard}/>
                <SidebarTools 
                    hidden={false} 
                    onToggleState={onToggleState}/>
            </div>
        );
    }

    return(
        <>
            {isHidden ? <HiddenSidebar/> : <VisibleSidebar/>}
        </>
    )
}

export default Sidebar;