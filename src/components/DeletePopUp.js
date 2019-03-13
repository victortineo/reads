import React, {Component} from 'react'
import './deletePopUp.scss'
const DeletePopUp = (props) => {
    return (
        <div className="deletePopUp">
            <div className="deletePopUp__content">
                <h3 className="deletePopUp__message">Deseja deletar este post?</h3>
                <span className="deletePopUp__desc">Esta ação é irreversível</span>
                <button className="deletePopUp__button deletePopUp__button--yes" onClick={props.handleDelete}>Sim</button>
                <button className="deletePopUp__button deletePopUp__button--no" onClick={() => props.handleModal(false)}>Não</button>
            </div>
        </div>
    )
}

export default DeletePopUp