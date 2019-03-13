import React, { Component } from 'react';
import {connect} from 'react-redux'
import './comment.scss'
import { Link, withRouter } from 'react-router-dom'
import {handleAddVote, handleDisableComment} from '../actions/comments'
import DeletePopUp from './DeletePopUp';



class Comment extends Component {
    state = {
        modal: false 
    }
    formatDate(timestamp) {
        const time = new Date(timestamp);
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        const year = time.getFullYear();
        const month = months[time.getMonth()];
        const date = time.getDate();
        const hour = time.getHours();
        const min = time.getMinutes();        
        const finalDate = `${hour}h${min} │ ${date}  ${month}  ${year}`;
        return finalDate;
    }
    handleVote = (option) => {
        this.props.dispatch(handleAddVote(option, this.props.id))
    }
    handleDelete = (parentId) => {
        this.props.dispatch(handleDisableComment(this.props.id, parentId))
    }
    handlePopConfirm = () => {
        this.handleDelete(this.props.comment[0].parentId)
    }
    handleModal = (option) => {
        this.setState({
            modal: option
        })
    }
    render() {
        const comment = this.props.comment[0]
        return (
            <div className="comment">
                <div className="post__options">
                    <Link className="post__edit" to={`/edit/comment/${comment.id}`}>Editar</Link>
                    <span className="post__delete" 
                        onClick={() => this.handleModal(true)}>Deletar
                    </span>
                </div>
                {comment && (
                    <React.Fragment>
                        <p className="comment__author">Por: {comment.author} <em className="comment__date">Em: {this.formatDate(comment.timestamp)}</em></p>
                        <span className="comment__likes">
                            {comment.voteScore}
                            <span 
                                className="post__upVote"
                                onClick={(e, opt = 'upVote') => this.handleVote(opt)}
                                >upvote |  
                            </span>
                            <span 
                                className="post__downVote"
                                onClick={(e, opt = 'downVote') => this.handleVote(opt)}
                                > downVote
                            </span>    
                        </span>
                        <div className="comment__body">
                            {comment.body}
                        </div>
                    </React.Fragment>
                )}
                {this.state.modal && (
                    <DeletePopUp handleDelete={this.handlePopConfirm} handleModal={this.handleModal}/>
                )}
            </div>
        );
    }
}

function mapStateToProps({comments}, props){
    return {
        comment: comments[props.currentPost].filter(comment => comment.id === props.id)
    }
}

export default withRouter(connect(mapStateToProps)(Comment))
