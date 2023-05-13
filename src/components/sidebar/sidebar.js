import { useCallback, useState } from 'react';
import './sidebar.scss';
import SidebarTools from "../sidebar-tools/sidebar-tools";
import SidebarButtons from "../sidebar-buttons/sidebar-buttons";
import HideSidebarBtn from '../sidebar-hide-btn/sidebar-hide';

const Sidebar = ({boards}) => {
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
    
    const VisibleSidebar = useCallback(() => {
        return(
            <div className="sidebar">
                <div className='sidebar-content'>
                    <p className="sidebar__boards-count">All Boards ({boards.length})</p>
                    <SidebarButtons 
                        boards={boards}/>
                    <SidebarTools
                        onToggleState={onToggleState}/>
                </div>
            </div>
        );
        // eslint-disable-next-line
    }, [boards])

    return(
        <>
            {isHidden ? <HiddenSidebar/> : <VisibleSidebar/>}
        </>
    )
}

export default Sidebar;