import * as API from '../api'
export const ADD_POST = "ADD_POSTS"
export const EDIT_POST = "EDIT_POST"
export const GET_POST = "GET_POST"
export const GET_POSTS = "GET_POSTS"
export const ADD_POST_VOTE = "ADD_POST_VOTE"
export const DISABLE_POST = "DISABLE_POST"
export const COMMENT_COUNTER = "COMMENT_COUNTER"


function getAllPosts (posts){
    return {
        type: GET_POSTS,
        posts
    }
}

export function handleGetAllPosts (posts) {
    return (dispatch) => {
        dispatch(getAllPosts(posts))
    }
}

function getPost (post){
    return {
        type: GET_POST,
        post
    }
}

export function handleGetPost (id) {
    return (dispatch) => {
        return API.getPost(id)
        .then(post => dispatch(getPost(post)))
    }
}

function addPost (post){
    return {
        type: ADD_POST,
        post
    }
}

export function handleAddPost (post) {
    return (dispatch) => {
        const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        API.addPost({
            id,
            timestamp: Date.now(),
            title: post.title,
            body: post.text,
            author: post.author,
            category: post.category,
        })
        .then((post) => dispatch(addPost(post)))
    }
}

function editPost (post){
    return {
        type: EDIT_POST,
        post
    }
}

export function handleEditPost (post) {
    return (dispatch) => {
        API.editPost({
            id: post.postId,
            timestamp: post.timestamp,
            title: post.title,
            body: post.text,
            author: post.author,
            category: post.category,
        }, 
        post.postId)
        .then((post) => dispatch(editPost(post)))
    }
}

function postCommentCounter (id, value){
    return {
        type: COMMENT_COUNTER,
        id,
        value
    }
}

export function handlePostCommentCounter (id, value = 1) {
    return (dispatch) => {
        dispatch(postCommentCounter(id, value))
    }
}

function addVote (post){
    return {
        type: ADD_POST_VOTE,
        post
    }
}

export function handleAddVote (option, id) {
    return (dispatch) => {
        return API.votePost(option, id)
        .then((post) => dispatch(addVote(post)))
    }
}

function disablePost (id){
    return {
        type: DISABLE_POST,
        id
    }
}

export function handleDisablePost (id) {
    return (dispatch) => {
        return API.deletePost(id)
        .then(() => dispatch(disablePost(id)))

    }
}