import * as API from '../api'
export const ADD_COMMENT = "ADD_COMMENT"
export const EDIT_COMMENT = "EDIT_COMMENT"
export const GET_COMMENTS = "GET_COMMENTS"
export const GET_COMMENT = "GET_COMMENT"
export const GET_BY_PARENT = "GET_BY_PARENT"
export const ADD_COMMENT_VOTE = "ADD_COMMENT_VOTE"
export const DISABLE_COMMENT = "DISABLE_COMMENT"
export const DISABLE_BY_PARENT = "DISABLE_BY_PARENT"

function getByParent (comments, parentID){
    return {
        type: GET_BY_PARENT,
        comments: {[parentID]: comments}
    }
}

export function handleGetByParent (parentID) {
    return (dispatch) => {
        return API.getCommentsByParent(parentID)
        .then(comments => dispatch(getByParent(comments, parentID)))
    }
}

function addComment (comment, parentID){
    return {
        type: ADD_COMMENT,
        parentID,
        comment
    }
}

export function handleAddComment (comment, parentID) {
    return (dispatch) => {
        const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        API.addPostComment({
            id,
            timestamp: Date.now(),
            body: comment.text,
            author: comment.author,
            parentId: parentID,
            replyTo: comment.replyTo
        }, parentID)
        .then((comment) => dispatch(addComment(comment, parentID)))
    }
}

function editComment (comment, parentID){
    return {
        type: EDIT_COMMENT,
        parentID,
        comment
    }
}

export function handleEditComment (comment, parentID) {
    return (dispatch) => {
        API.editPostComment(comment.id, {body: comment.text, author: comment.author})
        .then((comment) => dispatch(editComment(comment, parentID)))
    }
}

function addVote (comment){
    return {
        type: ADD_COMMENT_VOTE,
        comment
    }
}

export function handleAddVote (option, id) {
    return (dispatch) => {
        return API.voteComment(option, id)
        .then((comment) => dispatch(addVote(comment)))
    }
}

function disableComment (id, parentId){
    return {
        type: DISABLE_COMMENT,
        id,
        parentId
    }
}

export function handleDisableComment (id, parentId) {
    return (dispatch) => {
        return API.deleteComment(id)
        .then(() => dispatch(disableComment(id, parentId)))

    }
}
