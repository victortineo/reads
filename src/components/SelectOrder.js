import React, {Component} from 'react'
import { connect } from 'react-redux'
import {handleOrderBy} from '../actions/order'
import './select.scss'

class SelectOrder extends Component {
    state = {
        option: '',
    }
    handleChange = (e) => {
        this.setState(
            { option: e.target.value },
            () => this.props.dispatch(handleOrderBy(this.state.option))
          );
    }
    render() {
        return (
            <div className="select">
                <strong className="select__title">Ordenar por</strong>
                <form className='select__form' onSubmit={this.handleSubmit}>
                    <select onChange={this.handleChange} value={this.state.option} className="select__options" name="option">
                        <option value="" disabled hidden>Selecione...</option>
                            <option className="select__option" key={'orderByDate+'} value={'date+'}>Mais novos</option>
                            <option className="select__option" key={'orderByDate-'} value={'date-'}>Mais velhos</option>
                            <option className="select__option" key={'orderByLikes+'} value={'like+'}>Mais relevantes</option>
                            <option className="select__option" key={'orderByLikes-'} value={'like-'}>Menos relevantes</option>
                    </select>
                </form>
            </div>
        )
    }
}


function mapStateToProps({order}, props){
    return {
        order: order
    }
}
export default connect(mapStateToProps)(SelectOrder)