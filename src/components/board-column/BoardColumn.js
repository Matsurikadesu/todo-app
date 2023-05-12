import './board-column.scss';
import Task from '../BoardTask/BoardTask';

const BoardColumn = ({column, id}) => {
    let count = 0;

    const elements = column.tasks.map((item, index) => {
        count++;

        return(
            <Task 
                data={item} 
                key={index}/>
        );
    });

    return(
        <div className='board__column' data-id={id}>
            <div className='column__header'>
                <span className='column__header-status'></span>
                <h3 className='column__header-text'>{column.name} ({count})</h3>
            </div>
            <div className='column__tasks'>
                {elements}
            </div>
        </div>
    )
}

export default BoardColumn;