import { useFormContext } from "react-hook-form";

const InputListItem = ({index, subtask}) => {
    const { register } =  useFormContext();

    return(
        <li className='card__subtasks-item'>
            <input className='card__subtasks-checkbox' {...register(`elements.${index}.iscompleted`)} id={`elements.${index}.iscompleted`} type="checkbox" defaultChecked={subtask.iscompleted}/>
            <label htmlFor={`elements.${index}.iscompleted`} className='card__subtasks-label'>{subtask.name}</label>
        </li>
    )
}

export default InputListItem;
