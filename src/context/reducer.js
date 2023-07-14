export const initialState = {
    boardId: 'placeholder',
    currentBoard: {columns: [], name: 'Loading...', id: 'placeholder'},
    boards: []
}

const reducer = (state, action) => {
    const {type, payload} = action;

    switch (type) {
        case "CHANGE_BOARDID":
            return{
                ...state,
                boardId: payload.boardId
            }
        case "CHANGE_CURRENTBOARD":
            return{
                ...state,
                currentBoard: payload.currentBoard
            }
        case "CHANGE_BOARDS":
            return{
                ...state,
                boards: payload.boards
            }
        default:
            throw new Error('No case for type: ' + type);
    }
}

export default reducer;