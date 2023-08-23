import { render, screen } from "@testing-library/react"
import BoardColumn from "./BoardColumn"

test('should render tasks based on given props', () => {
    const tasks = 
        [
            {name: 'task name', description: '', id: '0', subtasks: [], status: 'todo'},
            {name: 'task name', description: '', id: '1', subtasks: [], status: 'todo'},
            {name: 'task name', description: '', id: '2', subtasks: [], status: 'todo'},
            {name: 'task name', description: '', id: '3', subtasks: [], status: 'todo'}
        ]   
    const name = 'todo'
    render(
        <BoardColumn 
            name={name}
            tasks={tasks}/>
    )

    const tasksAmount = screen.getByText(`${name} (${tasks.length})`);

    expect(tasksAmount).toBeDefined();
})