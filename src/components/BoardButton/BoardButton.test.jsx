import { render, screen } from "@testing-library/react"
import DataContext from "../../context/context"
import BoardBtn from "./BoardButton"
import userEvent from "@testing-library/user-event";

const changeBoardId = jest.fn();

function renderComponent(testId){
    const boardId = 1;

    render(
        <DataContext.Provider value={{boardId, changeBoardId}}>
            <BoardBtn name={'test'} id={testId}/>
        </DataContext.Provider>
    )
}

test('should change board id', () => {
    renderComponent(2)

    const button = screen.getByRole('button');
    userEvent.click(button);

    expect(changeBoardId).toBeCalled();
})

test('should not change board id if current board id and next board id are equal', () => {
    renderComponent(1);

    const button = screen.getByRole('button');
    userEvent.click(button);

    expect(changeBoardId).not.toBeCalled();
})