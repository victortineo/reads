import React, { Component } from 'react';
import {connect} from 'react-redux'
import './postpreview.scss'
import { Link, withRouter } from 'react-router-dom'
import Post from './Post'
import Comment from './Comment'
import NewComment from './NewComment'
import {handleGetByParent} from '../actions/comments' 
import {handleGetPost} from '../actions/posts' 
import './postPage.scss'
import NotFound from './error404'
import {getPost} from '../api'

class PostPage extends Component {
    state = {
        error404: false
    }
    componentDidMount = () => {
        this.props.dispatch(handleGetByParent(this.props.match.params.id))
        this.props.dispatch(handleGetPost(this.props.match.params.id))
        .then(res => res.post.error ? this.setState({error404: true}) : false )
        
    }
    render(){
        const {id, post} = this.props
        if(this.state.error404 === true){
            return(
                <NotFound />
            )
        }
        return(
            <div className="postPage">
                <Post id={id} />
                <h4 className="postPage__commentsTitle">Comments</h4>
                <ul className="postPage__comments-wrapper">
                {this.props.comments && this.props.comments.map(comment => 
                    <li key={comment.id}>
                        <Comment id={comment.id} currentPost={id} />
                    </li>
                )}
                </ul>
                <NewComment id={id} />
            </div>
        )
    }
}

function mapStateToProps({comments}, props){
    const { id } = props.match.params
    return {
        id,
        comments: comments ? comments[id] : [],
    }
}

export default connect(mapStateToProps)(PostPage)