import { useContext } from "react";
import BoardBtn from "../BoardButton/BoardButton";
import dataContext from "../../context";

const SidebarButtons = () =>{
    const { boards } = useContext(dataContext);
    /**Генерация кнопок исходя из пришедшего массива boards */
    const buttons = boards.map((board) => {
        return(
            <BoardBtn
                name={board.name}
                key={board.id} 
                id={board.id}/>
        )
    })

    return (
        <div className="sidebar__boards-container">
            {buttons}
            <BoardBtn
                name='+Create New Board' 
                key='-1'
                id={-1}/>
        </div>
    )
}

export default SidebarButtons;