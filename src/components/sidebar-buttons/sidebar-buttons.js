import BoardBtn from "../app-board-button/app-board-button";

const SidebarButtons = ({boards}) =>{
    
    const elements = boards.map(item => {
        return(
            <BoardBtn {...item}/>
        )
    })

    return (
        <div className="sidebar__boards-container">
            {elements}
        </div>
    )
}

export default SidebarButtons;