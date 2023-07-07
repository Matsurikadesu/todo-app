import { createContext, useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";

const DataContext = createContext({});

export const DataProvider = ({ theme, setTheme, children }) => {
    const [boardId, setBoardId] = useState('placeholder');
    const [boards, setBoards] = useState([]);
    const [currentBoard, setCurrentBoard] = useState({columns: [], name: ''});

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
            currentBoard, setTheme, theme
        }}>
            {children}
        </DataContext.Provider>
    )
}
export default DataContext;

//  const [state, setState] = useState({
//         currentBoard: 0,
//         currentColumn: 0,
//         darkTheme: theme,
//         isEditMenuOpened: false,
//         shownTask: null,
//         edit: null,
//         data: initialData,
//         add: null,
//         delete: false,
//         boardId: 'jL3QeXE40knniuDHghVI'
//     });