import { createContext, useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, onSnapshot, orderBy, query} from "firebase/firestore";

const DataContext = createContext({});

export const DataProvider = ({ theme, setTheme, children }) => {
    const [boardId, setBoardId] = useState('placeholder');
    const [boards, setBoards] = useState([{columns: [], name: '', id: 'placeholder'}]);
    const [currentBoard, setCurrentBoard] = useState({columns: [], name: ''});

    const changeTheme = () => {
        localStorage.theme = !theme;
        setTheme(!theme);
    }

    function fetchBoards(){
        const ref = query(collection(db, 'boards'), orderBy('timestamp'));

        onSnapshot(ref, (querySnapshot) => {
            const newBoards = querySnapshot.docs
                .filter(doc => doc.data().name !== 'Loading...')
                .map(doc => ({...doc.data(), id: doc.id}));
            setBoards(newBoards);
            setBoardId(newBoards[0].id);
        })
    }

    useEffect(() => {
        fetchBoards();
        // eslint-disable-next-line
    },[])

    useEffect(() => {
        setCurrentBoard(boards.find(board => board.id === boardId))
        //eslint-disable-next-line
    }, [boardId])

    return (
        <DataContext.Provider value={{
            boardId, setBoardId, boards,
            currentBoard, changeTheme, theme
        }}>
            {children}
        </DataContext.Provider>
    )
}
export default DataContext;