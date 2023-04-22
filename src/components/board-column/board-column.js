import './board-column.scss';

const BoardColumn = ({column}) => {

    return(
        <div className='board__column'>
            <div className='column__header'>
                <span className='column__header-status'></span>
                <h3 className='column__header-text'>{column.name}</h3>
            </div>
            <div className='column__tasks'>
                <div className='column__task'>
                    <h4 className='column__task-title'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae mollitia hic consectetur explicabo, obcaecati dignissimos.</h4>
                    <div className='column__task-status'>0 of 1 subtask</div>
                </div>
                <div className='column__task'>
                    <h4 className='column__task-title'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae mollitia hic consectetur explicabo, obcaecati dignissimos.</h4>
                    <div className='column__task-status'>0 of 1 subtask</div>
                </div>
                <div className='column__task'>
                    <h4 className='column__task-title'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae mollitia hic consectetur explicabo, obcaecati dignissimos.</h4>
                    <div className='column__task-status'>0 of 1 subtask</div>
                </div>
            </div>
        </div>
    )
}

export default BoardColumn;