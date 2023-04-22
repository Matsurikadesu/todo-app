import BoardBtn from "../app-board-button/app-board-button";

const SidebarButtons = ({boards}) =>{
    
    const elements = boards.map((item, index) => {
        let isActive = false;
        
        if (index === 0){
            isActive = true;
        }

        return(
            <BoardBtn {...item} state={isActive} key={index}/>
        )
    })

    return (
        <div className="sidebar__boards-container">
            {elements}
            <BoardBtn name='+Create New Board' key='-1' />
        </div>
    )
}

export default SidebarButtons;