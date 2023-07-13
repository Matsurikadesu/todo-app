import { createContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, orderBy, query} from "firebase/firestore";

const DataContext = createContext({});

export const DataProvider = ({setTheme, children }) => {
    const [boardId, setBoardId] = useState('placeholder');
    const [boards, setBoards] = useState([{columns: [], name: 'Loading...', id: 'placeholder'}]);
    const [currentBoard, setCurrentBoard] = useState({columns: [], name: 'Loading,', id: 'placeholder'});

    const changeTheme = () => {
        const oldTheme = localStorage.theme === 'true' ? true : false;
        localStorage.theme = !oldTheme;
        setTheme(!oldTheme);
    }

    /**Получает данные о boards от бд и следит за изменениями этих данных */
    function fetchBoards(){
        const ref = query(collection(db, 'boards'), orderBy('timestamp'));

        onSnapshot(ref, (querySnapshot) => {
            const newBoards = querySnapshot.docs
                .filter(doc => doc.data().name !== 'Loading...')
                .map(doc => ({...doc.data(), id: doc.id}));
            setBoards(newBoards);
            /**Устанавливает boardId при первом получении данных*/
            if(boardId === 'placeholder') setBoardId(newBoards[0].id);
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
        if(boardId !== 'placeholder') setCurrentBoard(boards.find(board => board.id === boardId))
    }, [boardId, boards])

    return (
        <DataContext.Provider value={{
            boardId, setBoardId, boards,
            currentBoard, changeTheme
        }}>
            {children}
        </DataContext.Provider>
    )
}
export default DataContext;