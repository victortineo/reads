import React, {Component} from 'react'
import './SearchForm.scss';
import {withRouter} from 'react-router-dom'

class NewComment extends Component {
    state = {
        query: '',
        redirect: false
    }
    handleChange = (e) => {
        const text = e.target.value
        this.setState({
            [e.target.name]: text
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.history.push(`/search/${this.state.query}`)
        this.setState({
            query: ''
        })
    }
    render() {
        const {query} = this.state
        return (
            <form className='searchForm' onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    value={query}
                    name="query"
                    onChange={this.handleChange}
                    className="searchForm__input"
                />
                <button 
                    className="searchForm__submit "
                    type="submit"
                    disabled={query.trim() === ''}>
                    Pesquisar
                </button>
            </form>
        )
    }
}

export default withRouter(NewComment)