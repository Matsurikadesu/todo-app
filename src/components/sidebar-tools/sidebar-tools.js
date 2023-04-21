import './sidebar-tools.scss';
import ChooseThemeElement from "../sidebar-theme/sidebar-theme";
import HideSidebarBtn from '../sidebar-hide-btn/sidebar-hide';

const SidebarTools = () => {
    return(
        <div className='sidebar__tools'>
            <ChooseThemeElement />
            <HideSidebarBtn />
        </div>
    );
}

export default SidebarTools;