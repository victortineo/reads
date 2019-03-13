import React, { Component } from 'react';
import {connect} from 'react-redux'
import './postpreview.scss'
import { Link, withRouter } from 'react-router-dom'
import {handleAddVote, handleDisablePost} from '../actions/posts'
// import { Redirect } from 'react-router-dom'
import DeletePopUp from './DeletePopUp';

 
class Post extends Component {
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
    handleDelete = () => {
        this.props.dispatch(handleDisablePost(this.props.id))
        this.handleModal(false)
    }
    handleModal = (option) => {
        this.setState({
            modal: option
        })
    }
    render() {
        const post = this.props.post[0]
        const {id} = this.props
        
        return (
            <div className="post">
                <div className="post__options">
                    <Link className="post__edit" to={`/edit/post/${id}`}>Edit</Link>
                    <span className="post__delete" 
                        onClick={() => this.handleModal(true)}>Delete</span>
                </div>
                {post && (
                    <React.Fragment>
                        <Link to={`/category/${post.category}`} className={`post__categoryBadge post__categoryBadge--${post.category}`}>{post.category}</Link>
                        <Link to={`/post/${id}`} className="post__container">
                        <h2 className="post__title">{post.title}</h2>
                        <p className="post__author">Por: {post.author} <em className="post__date">Postado em: {this.formatDate(post.timestamp)}</em></p>
                        </Link>
                        <span className="post__comments">Comentários: {post.commentCount}</span>
                        <span className={`post__likes ${post.voteScore >= 0 ? 'post__likes--positive' : 'post__likes--negative'}`}>
                            {post.voteScore} 
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
                        {this.props.type !== 'preview' && (
                            <p className="post__body">
                                {post.body}
                            </p>
                        )}
                    </React.Fragment>
                )}
                {this.state.modal && (
                    <DeletePopUp handleDelete={this.handleDelete} handleModal={this.handleModal}/>
                )}
            </div>
        );
    }
}

function mapStateToProps({posts}, props){
    return {
        post: Object.values(posts).filter(post => post.id === props.id)
    }
}

export default withRouter(connect(mapStateToProps)(Post))
