import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import EditBtn from "./EditBtn";

function renderComponent(mock){
    render(
        <EditBtn handleEditButtonClick={mock}/>
    )
}

test('should render edit button component', () => {
    const mock = jest.fn();
    renderComponent(mock);

    const button = screen.getByRole('button');

    expect(button).toBeDefined();
})

test('should call function on click', () => {
    const mock = jest.fn();
    renderComponent(mock);

    const button = screen.getByRole('button');
    userEvent.click(button);

    expect(mock).toBeCalled();
})