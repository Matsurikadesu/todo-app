import { render, screen } from "@testing-library/react";
import SidebarButtons from "./SidebarButtons";

test('should render buttons based on boards length', () => {
    const boards = [{name: '1', id: 0}, {name: '2', id: 1}];
    render(<SidebarButtons boards={boards}/>);

    const buttons = screen.getAllByRole('button');

    expect(buttons.length).toBe(boards.length + 1);
})