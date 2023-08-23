import { render, screen } from "@testing-library/react";
import TaskPopup from "./TaskPopup";
import { DataProvider } from "../../context/context";

function renderComponent() {
    render(
        <DataProvider>
            <TaskPopup 
                name={'task name'} 
                description={'task description'} 
                id={123} 
                subtasks={[{name: 'subtask1', iscompleted: true}, {name: 'subtask2', iscompleted: false}]} 
                setIsOpened={() => {}} 
                setIsEditing={() => {}} 
                status={'task status'}
            />
        </DataProvider>
    )
}

test('should render component with 2 checkbox inputs', () => {
    renderComponent();
    
    const inputs = screen.getAllByRole('checkbox');

    expect(inputs).toHaveLength(2);
});

test('should render component with 1 completed subtask out of 2', () => {
    renderComponent();

    const result = screen.getByText('Subtasks (1 of 2)');

    expect(result).toBeDefined();
})
