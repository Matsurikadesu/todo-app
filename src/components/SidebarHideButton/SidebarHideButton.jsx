import './sidebar-hide.scss';
/** Компонент отвечающий за скрытие sidebar */
const HideSidebarBtn = ({onToggleState, hidden = false}) => {
    const HideSidebarButtonHidden = () => {
        return(
            <button className='hide-sidebar-btn_hidden' onClick={onToggleState}>
                <img src="./images/sidebarHidden.svg" alt="crossed eye icon" />
            </button>
        )
    }

    const HideSideBarButtonVisible = () => {
        return(
            <button className='hide-sidebar-btn' onClick={onToggleState}>
                <img src="./images/sidebarVisible.svg" alt="eye icon" />
                <span className='hide-sidebar-text'>Hide Sidebar</span>
            </button>
        );
    }
    
    return (
        <>
            {hidden ? <HideSidebarButtonHidden/> : <HideSideBarButtonVisible/>}
        </>
    )
}

export default HideSidebarBtn;