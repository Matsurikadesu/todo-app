import { render, screen } from "@testing-library/react";
import Button from "./Button";
import DataContext from "../../context/context";
/**
 * renders button
 * @param {*} columns columns length
 */
function renderComponent(columns){
    const columnsArray = [];
    for(let i = 0; i < columns; i++) columnsArray.push({});
    const currentBoard = {columns: columnsArray};

    render(
        <DataContext.Provider value={{currentBoard}}>
            <Button />
        </DataContext.Provider>
    )
}

test('should be disabled if there is no columns on the board', () => {
    renderComponent(0);

    const button = screen.getByRole('button');

    expect(button.disabled).toBe(true);
})

test('should be enabled if there is columns on the board', () => {
    renderComponent(5);

    const button = screen.getByRole('button');

    expect(button.disabled).toBe(false);
})