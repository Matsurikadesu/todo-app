import './EditBtn.scss';
import dataContext from '../../context';
import { useContext } from 'react';

const EditBtn = ({target}) => {
    const {state, setState} = useContext(dataContext);

    const onEditMenuOpen = (e) => {
        const openMenuTarget = e.target.closest('button[data-menu-target]').getAttribute('data-menu-target');
        setState({
            ...state,
            isEditMenuOpened: !state.isEditMenuOpened,
            menuTarget: openMenuTarget
        });
    }

    return(
        <button className="btn-menu" data-menu-target={target} onClick={onEditMenuOpen}>
            <div className="btn-menu-comp"></div>
            <div className="btn-menu-comp"></div>
            <div className="btn-menu-comp"></div>
        </button>
    )
}

export default EditBtn;