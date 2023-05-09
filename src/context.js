import { createContext } from "react";

const dataContext = createContext({
    currentBoard: '0',
    darkTheme: false,
    isEditMenuOpened: false,
    shownTask: null,
    menuTarget: null,
    add: null,
    edit: null,
    data: {}
});

export default dataContext;