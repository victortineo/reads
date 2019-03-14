import React, {Component} from 'react'
import { connect } from 'react-redux'
import {handleAddComment, handleEditComment} from '../actions/comments'
import {handlePostCommentCounter} from '../actions/posts'
import {getComment} from '../api'
import { Redirect } from 'react-router-dom'
import './AddForm.scss';

class NewComment extends Component {
    state = {
        text: '',
        title: '',
        author: '',
        currentId: '',
        parentId: '',
        toParent: false
    }
    handleChange = (e) => {
        const text = e.target.value

        this.setState({
            [e.target.name]: text
        })
    }
    addDispatches = (text, author, id) => {
        this.props.dispatch(handleAddComment({text, author}, id))    
        this.props.dispatch(handlePostCommentCounter(id))
    }
    editDispatches = (text, author, currentId, parentId) => {
        this.props.dispatch(handleEditComment({text, author, id: currentId}, parentId))
        this.setState({
            toParent: true
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()

        const {text, author, currentId, parentId} = this.state
        const { id } = this.props

        this.props.editing === true ? (
            this.editDispatches(text, author, currentId, parentId)   
        ) :
        (
            this.addDispatches(text, author, id)   
        )
        this.setState({
            text: ''
        })
    }
    componentDidMount = () => {   
        this.props.editing && (
            getComment(this.props.match.params.id)
            .then(
                comment => this.setState({
                    text: comment.body,
                    author: comment.author,
                    currentId: comment.id,
                    parentId: comment.parentId
                })
            )
        )
    }
    render() {
        const {text, author, parentId, toParent} = this.state
        if(toParent === true){
            return <Redirect to={`/post/${parentId}`} />
        }
        return (
            <div className="addForm">
                <h3 className="addForm__title">Sobre o que você esta pensando?</h3>
                <form className='addForm__form' onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        value={author}
                        placeholder="Qual seu nome?"
                        name="author"
                        onChange={this.handleChange}
                        className="addForm__input"
                    />
                    <textarea 
                        placeholder="O que achou deste post?" 
                        value={text}    
                        onChange={this.handleChange}
                        name="text"
                        className="addForm__text"
                        />
                    <div>
                        <button 
                            className="addForm__submit "
                            type="submit"
                            disabled={text.trim() === ''}>
                            Enviar
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default connect()(NewComment)