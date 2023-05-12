import { useContext } from "react";
import BoardBtn from "../BoardButton/BoardButton";
import dataContext from "../../context";

const SidebarButtons = ({boards}) =>{
    const {state} = useContext(dataContext);
    const {currentBoard} = state;
    const elements = boards.map((item, index) => {
        let isActive = false;

        if (index === +currentBoard){
            isActive = true;
        }

        return(
            <BoardBtn 
                {...item}
                state1={isActive} 
                key={index} 
                id={index}/>
        )
    })

    return (
        <div className="sidebar__boards-container">
            {elements}
            <BoardBtn
                name='+Create New Board' 
                key='-1'
                id='-1' />
        </div>
    )
}

export default SidebarButtons;