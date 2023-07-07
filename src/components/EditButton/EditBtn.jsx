import './EditBtn.scss';

const EditBtn = ({handleEditButtonClick}) => {
    return(
        <button className="btn-menu" onClick={handleEditButtonClick}>
            <div className="btn-menu-comp"></div>
            <div className="btn-menu-comp"></div>
            <div className="btn-menu-comp"></div>
        </button>
    )
}

export default EditBtn;