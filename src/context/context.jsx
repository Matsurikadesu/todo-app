import { createContext, useEffect, useReducer } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, orderBy, query} from "firebase/firestore";
import reducer, { initialState } from "./reducer";

const DataContext = createContext(initialState);

export const DataProvider = ({setTheme, children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const changeBoardId = (id) => {
        dispatch({
            type: 'CHANGE_BOARDID',
            payload: {
                boardId: id
            }
        })
    }

    const changeCurrentBoard = (currentBoard) => {
        dispatch({
            type: 'CHANGE_CURRENTBOARD',
            payload: {
                currentBoard
            }
        })
    }

    const changeBoards = (boards) => {
        dispatch({
            type: 'CHANGE_BOARDS',
            payload: {
                boards
            }
        })
    }

    /**Меняет тему основываясь на значении из локального хранилища */
    const changeTheme = () => {
        const oldTheme = localStorage.theme === 'true' ? true : false;
        localStorage.theme = !oldTheme;
        setTheme(!oldTheme);
    }

    /**Получает данные о boards от бд и следит за изменениями этих данных */
    function fetchBoards(){
        const ref = query(collection(db, 'boards'), orderBy('timestamp'));
        let count = 0;
        onSnapshot(ref, (querySnapshot) => {
            const newBoards = querySnapshot.docs
                .filter(doc => doc.data().name !== 'Loading...')
                .map(doc => ({...doc.data(), id: doc.id}));
            
            changeBoards(newBoards);
            //Устанавливает boardId при первом получении данных
            if(!(count++ > 0)) changeBoardId(newBoards[0].id);
        })
    }
    
    useEffect(() => {
        fetchBoards();
        // eslint-disable-next-line
    },[])

    /**
     * Если данные уже пришли и при этом изменилось boardId или данные boards внутри бд,
     *  меняет текущую доску, что вызывает ререндер компонента и обновление данных на стороне пользователя 
     * */
    useEffect(() => {
        if(state.boardId !== 'placeholder') changeCurrentBoard(state.boards.find(board => board.id === state.boardId));
    }, [state.boardId, state.boards])

    const value = {
        boardId: state.boardId,
        currentBoard: state.currentBoard,
        changeBoardId,
        boards: state.boards,
        changeTheme
    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}
export default DataContext;