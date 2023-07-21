import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

export const useCustomForm = (elements, type) => {
    const methods = useForm();
    const [isHidden, setIsHidden] = useState(true);
    
    const { fields, append, remove } = useFieldArray({
        control: methods.control,
        name: 'elements'
    });
    
    useEffect(() => {
        remove();

        // создание fields с нужными именами
        switch(type){
            case 'subtasks':
                elements.forEach(subtask => {
                    append({
                        name: subtask.name,
                        iscompleted: subtask.iscompleted
                    }, {shouldFocus: false});
                })
                break;
            case 'columns': 
                elements.columns.forEach(column => {
                    append({
                        name: column.name
                    }, {shouldFocus: false});
                })
                break;
            case 'new subtasks': 
                elements.forEach(placeholder => {
                    append(placeholder, {shouldFocus: false});
                })
                break;
            default: 
                console.log('error', elements, type);
        }

        setIsHidden(false);
        //eslint-disable-next-line
    }, [])

    const removeElement = (index) => {
        remove(index);
    }

    return {
        methods,
        fields,
        append,
        removeElement,
        isHidden
    }
}
