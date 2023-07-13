import { useContext, useMemo } from "react";
import BoardBtn from "../BoardButton/BoardButton";
import dataContext from "../../context/context";
import AddBoardButton from "../BoardButton/AddNewBoardButton";

const SidebarButtons = () =>{
    const { boards } = useContext(dataContext);
    /**Генерация кнопок исходя из пришедшего массива boards */
    const buttons = useMemo(() => boards.map((board) => {
        return(
            <BoardBtn
                name={board.name}
                key={board.id} 
                id={board.id}/>
        )
    }),[boards])

    return (
        <div className="sidebar__boards-container">
            {buttons}

            <AddBoardButton/>
        </div>
    )
}

export default SidebarButtons;