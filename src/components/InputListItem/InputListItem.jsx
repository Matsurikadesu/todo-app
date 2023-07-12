import { useFormContext } from "react-hook-form";

const InputListItem = ({index, subtask}) => {
    const { register } =  useFormContext();

    return(
        <li className='card__subtasks-item'>
            <input className='card__subtasks-checkbox' {...register(`subtasks.${index}.iscompleted`)} type="checkbox" defaultChecked={subtask.iscompleted}/>
            <span className='card__subtasks-label'>{subtask.name}</span>
        </li>
    )
}

export default InputListItem;
