import React, {Component} from 'react'
import { connect } from 'react-redux'
import {handleAddPost, handleEditPost} from '../actions/posts'
import { Redirect } from 'react-router-dom'
import {getPost} from '../api'
import './AddForm.scss';

class NewPost extends Component {
    state = {
        text: '',
        title: '',
        author: '',
        category: '',
        toHome: false
    }
    handleChange = (e) => {
        const text = e.target.value

        this.setState({
            [e.target.name]: text
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()

        const {text, author, category, title} = this.state
        const { dispatch, id } = this.props

        this.props.match.params.id ? 
            dispatch(handleEditPost({text, author, category, title, postId: this.props.match.params.id}, id))
        :(
            dispatch(handleAddPost({text, author, category, title}, id))
        )
        this.setState({
            text: '',
            toHome: id ? false : true
        })
    }
    componentDidMount = () => {
        
        this.props.match.params.id && (
            getPost(this.props.match.params.id)
            .then(
                post => this.setState({
                    text: post.body,
                    title: post.title,
                    author: post.author,
                    category: post.category,
                })
            )
        )
    }
    render() {
        const {text, toHome, author, category, title} = this.state
        if(toHome === true){
            return <Redirect to='/' />
        }
        return (
            <div className="addForm">
                <h3 className="addForm__title">Compartilhe suas ideias</h3>
                <form className='addForm__form' onSubmit={this.handleSubmit}>
                    <select onChange={this.handleChange} value={category} name="category" className="addForm__select">
                        <option value="" disabled hidden>Categoria...</option>
                        {this.props.categories && this.props.categories.map(cat => 
                            <option key={cat.path} value={cat.path}>{cat.name}</option>
                        )}
                    </select>
                    <div className="addForm__row">
                        <input
                            type="text"
                            value={author}
                            placeholder="Qual o seu nome?"
                            name="author"
                            className="addForm__input"
                            onChange={this.handleChange}
                        />
                        <input
                            type="text"
                            value={title}
                            placeholder="Sobre o que vamos conversar hoje?"
                            name="title"
                            className="addForm__input"
                            onChange={this.handleChange}
                        />
                    </div>
                    <textarea 
                        placeholder="Desenvolva sua ideia" 
                        value={text}    
                        onChange={this.handleChange}
                        className="addForm__text"
                        name="text"
                        />
                    <div>
                    <button 
                        className="btn"
                        type="submit"
                        className="addForm__submit"
                        disabled={text.trim() === ''}>
                        Postar
                    </button>
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps({categories, posts}, props){

    return {
        categories: Object.values(categories)
    }
}

export default connect(mapStateToProps)(NewPost)