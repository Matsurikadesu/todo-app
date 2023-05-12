import './EditBtn.scss';
import dataContext from '../../context';
import { useContext } from 'react';

const EditBtn = ({target}) => {
    const {state, setState} = useContext(dataContext);
    const {isEditMenuOpened} = state;

    const onEditMenuOpen = () => {
        setState({
            ...state,
            isEditMenuOpened: isEditMenuOpened === target ? false: target
        });
    }

    return(
        <button className="btn-menu" onClick={onEditMenuOpen}>
            <div className="btn-menu-comp"></div>
            <div className="btn-menu-comp"></div>
            <div className="btn-menu-comp"></div>
        </button>
    )
}

// export default React.memo(EditBtn, (props, newProps) => {
//     if(props.target === newProps.target){
//         return true;
//     }
// })

export default EditBtn;