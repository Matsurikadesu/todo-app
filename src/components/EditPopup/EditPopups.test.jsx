import { render, screen } from "@testing-library/react";
import { DataProvider } from "../../context/context"
import TaskEditPopup from "./TaskEditPopup";
import BoardEditPopup from "./BoardEditPopup";
import DataContext from "../../context/context";

describe('TaskEditPopup tests', () => {
    function renderTaskComponent(){
        render(
            <DataProvider>
                <TaskEditPopup 
                    name={'task name'} 
                    description={'task description'} 
                    id={123} 
                    subtasks={[{name: 'subtask1', iscompleted: true}, {name: 'subtask2', iscompleted: false}]} 
                    setIsEditing={() => {}}
                    setIsOpened={() => {}}
                    status={'task status'}/>
            </DataProvider>
        )
    }

    test('should render subtasks inputs based on given prop', () => {
        renderTaskComponent();

        const subtaskInputs = screen.getAllByTestId('elementinput');

        expect(subtaskInputs.length).toBe(2);
    })

    test('should render inputs based on given props', () => {
        renderTaskComponent();

        const nameInput = screen.getByDisplayValue('task name');
        const descriptionInput = screen.getByDisplayValue('task description');
        
        expect(nameInput).toBeDefined();
        expect(descriptionInput).toBeDefined();
    })
})

describe('BoardEditPopup tests', () => {
    function renderBoardComponent(){
        const currentBoard = {
            name: 'test name', 
            columns: [{name: 'column1'}, {name: 'column2'}]
        };

        render(
            <DataContext.Provider value={{currentBoard}}>
                <BoardEditPopup closeEditPopup={() => {}}/>
            </DataContext.Provider>
        )
    }

    test('should render columns based on provided prop', () => {
        renderBoardComponent();

        const columnInputs = screen.getAllByTestId('elementinput');

        expect(columnInputs.length).toBe(2);
    })

    test('should render correct name', () => {
        renderBoardComponent();

        const name = screen.getByDisplayValue('test name');

        expect(name).toBeDefined();
    })
})