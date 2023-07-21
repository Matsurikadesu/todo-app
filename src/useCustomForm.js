import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
/**
 * Хук создает форму из react-hook-form и поля для fieldsArray. 
 * Поля в fieldsArray создаются не моментально, поэтому хук также создает стейт,
 * в который помещается булевое значение, false - означает, что поля еще не созданы,
 * true - поля созданы
 *  
 * @param {Array} elements 
 * @param {Function} callback 
 * @returns 
 */
export const useCustomForm = (elements, callback = () => {}) => {
    const methods = useForm();
    const [isFeildsCreationComplete, setIsFeildsCreationComplete] = useState(false);
    
    const { fields, append, remove } = useFieldArray({
        control: methods.control,
        name: 'elements'
    });
    
    useEffect(() => {
        remove();

        elements.forEach(item => append(item, {shouldFocus: false}))

        setIsFeildsCreationComplete(true);

        callback();
        //eslint-disable-next-line
    }, [])

    return {
        methods,
        fields,
        append,
        remove,
        isFeildsCreationComplete
    }
}
