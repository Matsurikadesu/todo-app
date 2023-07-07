import { createContext, useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";

const DataContext = createContext({});

export const DataProvider = ({ theme, setTheme, children }) => {
    const [boardId, setBoardId] = useState('placeholder');
    const [boards, setBoards] = useState([]);
    const [currentBoard, setCurrentBoard] = useState({columns: [], name: ''});

    const changeTheme = () => {
        localStorage.theme = !theme;
        setTheme(!theme);
    }

    async function fetchBoards(){
        const ref = query(collection(db, 'boards'), orderBy('timestamp'));

        await getDocs(ref).then((querySnapshot) => {
            const newBoards = querySnapshot.docs
                .filter(doc => doc.data().name !== 'Loading...')
                .map(doc => ({...doc.data(), id: doc.id}));
            setBoards(newBoards);
            setBoardId(newBoards[0].id);         
        })
    }

    async function fetchBoard(){
        await getDoc((doc(db, 'boards', boardId)))
        .then((querySnapshot) => {
            const board = querySnapshot.data();
            board.id = querySnapshot.id;
            setCurrentBoard(board);
        });
    }

    useEffect(() => {
        fetchBoard();

        // eslint-disable-next-line
    }, [boardId]);

    useEffect(() => {
        fetchBoards();

        // eslint-disable-next-line
    },[])

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