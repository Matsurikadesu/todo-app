import { useContext } from "react";
import BoardBtn from "../BoardButton/BoardButton";
import dataContext from "../../context";

const SidebarButtons = () =>{
    const { boards } = useContext(dataContext);

    const elements = boards.map((board) => {
        return(
            <BoardBtn
                name={board.name}
                key={board.id} 
                id={board.id}/>
        )
    })

    return (
        <div className="sidebar__boards-container">
            {elements}
            <BoardBtn
                name='+Create New Board' 
                key='-1'
                id={-1}/>
        </div>
    )
}

export default SidebarButtons;