import { useFormContext } from "react-hook-form";

const InputListItemEditable = ({element, index, handleInputDelete, isColumn = false}) => {
    const { register } =  useFormContext();

    return(
        <div className='card__subtask-input'>
            <input className='popup__input-field' type="text" {...register(`elements.${index}.name`)} placeholder={isColumn ? 'column name' : element.placeholder} defaultValue={isColumn ? element.name : ''}/>
            <button type="button" className='card__subtask-delete' onClick={() => handleInputDelete(index)}>
                <img src="images/cross.svg" alt="cross" />
            </button>
        </div>
    )
}

export default InputListItemEditable;