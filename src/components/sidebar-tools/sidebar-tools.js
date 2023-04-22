import './sidebar-tools.scss';
import ChooseThemeElement from "../sidebar-theme/sidebar-theme";
import HideSidebarBtn from '../sidebar-hide-btn/sidebar-hide';

const SidebarTools = ({onToggleState, chooseTheme}) => {

    return(
        <div className='sidebar__tools'>
            <ChooseThemeElement 
                onChooseTheme={chooseTheme}/>
            <HideSidebarBtn 
                onToggleState={() => onToggleState()}/>
        </div>
    );
}

export default SidebarTools;