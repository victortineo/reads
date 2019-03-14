import React, { Component } from 'react';
import {connect} from 'react-redux'
import './postpreview.scss'
import Post from './Post'
import Comment from './Comment'
import NewComment from './NewComment'
import {handleGetByParent} from '../actions/comments' 
import {handleGetPost} from '../actions/posts' 
import './postPage.scss'
import NotFound from './error404'

class PostPage extends Component {
    state = {
        error404: false,
        replyingTo: {}
    }
    componentDidMount = () => {
        this.props.dispatch(handleGetByParent(this.props.match.params.id))
        this.props.dispatch(handleGetPost(this.props.match.params.id))
        .then(res => res.post.error ? this.setState({error404: true}) : Object.keys(res.post).length === 0 && res.post.constructor === Object ? this.setState({error404: true}) : ''   )
        
    }
    handleReplyTo = (comment) => {
        this.setState({
            replyingTo: comment
        })
    }
    render(){
        const {id, post} = this.props
        if(this.state.error404 === true || post.deleted === true){
            return(
                <NotFound postPage={true}/>
            )
        }
        return(
            <div className="postPage">
                <Post id={id} />
                <h4 className="postPage__commentsTitle">Comments</h4>
                <ul className="postPage__comments-wrapper">
                {this.props.comments && this.props.comments.map(comment => 
                    <li key={comment.id}>
                        <Comment handleReplyTo={this.handleReplyTo} id={comment.id} currentPost={id} />
                    </li>
                )}
                </ul>
                <NewComment replyTo={this.state.replyingTo} id={id} />
            </div>
        )
    }
}

function mapStateToProps({comments, posts}, props){
    const { id } = props.match.params
    const post = Object.values(posts) ? Object.values(posts).filter(post => post.id === id) : ''
    return {
        id,
        comments: comments ? comments[id] : [],
        post: post.length > 0 ? post[0] : ''
    }
}

export default connect(mapStateToProps)(PostPage)