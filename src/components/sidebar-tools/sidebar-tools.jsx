import './sidebar-tools.scss';
import ChooseThemeElement from "../sidebar-theme/sidebar-theme";
import HideSidebarBtn from '../sidebar-hide-btn/sidebar-hide';

const SidebarTools = ({onToggleState}) => {

    return(
        <div className='sidebar__tools'>
            <ChooseThemeElement/>
            <HideSidebarBtn 
                onToggleState={() => onToggleState()}/>
        </div>
    );
}

export default SidebarTools;