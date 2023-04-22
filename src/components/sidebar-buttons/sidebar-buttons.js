import BoardBtn from "../app-board-button/app-board-button";

const SidebarButtons = ({boards, onBoardSelect, currentBoard}) =>{
    
    const elements = boards.map((item, index) => {
        let isActive = false;

        if (index === +currentBoard){
            isActive = true;
        }

        return(
            <BoardBtn {...item} onBoardSelect={(e) => onBoardSelect(e)} state={isActive} key={index} id={index}/>
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