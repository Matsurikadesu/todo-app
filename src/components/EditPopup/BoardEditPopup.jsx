import { useContext, useEffect } from "react";
import '../TaskPopup/taskPopup.scss';
import './edit-popup.scss';
import DataContext from "../../context";
import { useForm, useFieldArray } from "react-hook-form";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const BoardEditPopup = ({closeEditPopup}) =>{
    const {currentBoard} = useContext(DataContext);
    const methods = useForm();
    const { fields, append, remove } = useFieldArray({
        control: methods.control,
        name: 'columns'
    });

    useEffect(() => {
        currentBoard.columns.forEach((item) => append({name: item.name}));
        //eslint-disable-next-line
    }, [])

    const handleAddColumnButtonClick = () => {
        append({name: 'new column'});
    }

    const handleDeleteColumnButtonClick = (index) => {
        remove(index);
    }

    const handleEditBoardFormSubmit = (data) => {
        updateDoc(doc(db, 'boards', currentBoard.id), {
            name: data.name,
            columns: data.columns
        })
    }

    const handlePopupExit = (e) => {
        if(!e.target.classList.contains('popup')) return;
        closeEditPopup();
    }

    const columnsElements = fields.map((column, index) =>{
        return (
            <div className='card__subtask-input' key={column.id}>
                <input className='popup__input-field' {...methods.register(`columns.${index}.name`)} type="text" defaultValue={column.name}/>
                <button type="button" className='card__subtask-delete' onClick={() => handleDeleteColumnButtonClick(index)}>
                    <img src="images/cross.svg" alt="cross" />
                </button>
            </div>
        )
    })
    
    return (
        <div className='popup' onClick={handlePopupExit}>
            <form className='popup__card' onSubmit={methods.handleSubmit(handleEditBoardFormSubmit)}>
                <h3 className='popup__title'>Edit Board</h3>
                <div className='popup__input'>
                    <label htmlFor="title" className='text-m'>Title</label>
                    <input className='popup__input-field' type="text" {...methods.register('name')} required defaultValue={currentBoard.name}/>
                </div>
                <div className='popup__input'>
                    {columnsElements}
                    <button className='popup__btn' onClick={handleAddColumnButtonClick}>+ Add New Column</button>
                </div>
                <button type='submit' className='popup__btn submit-btn'>Save Changes?</button>
            </form>
        </div>
    )
}

export default BoardEditPopup;