import { useCallback, useContext, useState } from 'react';
import './sidebar.scss';
import SidebarTools from "../SidebarTools/SidebarTools";
import SidebarButtons from "../SidebarButtons/SidebarButtons";
import HideSidebarBtn from '../SidebarHideButton/SidebarHideButton';
import DataContext from '../../context/context';

const Sidebar = () => {
    const { boards } = useContext(DataContext);
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
                    <SidebarButtons/>
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