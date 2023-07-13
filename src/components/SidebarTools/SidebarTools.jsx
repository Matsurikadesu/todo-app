import './sidebar-tools.scss';
import ChooseThemeElement from "../SidebarTheme/SidebarTheme";
import HideSidebarBtn from '../SidebarHideButton/SidebarHideButton';
import { memo } from 'react';

const SidebarTools = memo(({onToggleState}) => {
    return(
        <div className='sidebar__tools'>
            <ChooseThemeElement/>
            <HideSidebarBtn 
                onToggleState={() => onToggleState()}/>
        </div>
    );
})

export default SidebarTools;