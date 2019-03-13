import { GET_BY_PARENT, ADD_COMMENT, EDIT_COMMENT, ADD_COMMENT_VOTE, DISABLE_COMMENT } from '../actions/comments'

export default function posts (state = {}, action){
    switch(action.type){
        case GET_BY_PARENT :
            return {
                ...state,
                ...action.comments
            }
        case ADD_COMMENT :
            state[action.parentID] = [...state[action.parentID], action.comment]
            return {
                ...state,
            }
        case EDIT_COMMENT : 
            const newComment = Object.values(state)[0]
            newComment.map(function(comment, i){
                if(comment.id === action.comment.id){
                    newComment[i] = action.comment
                }
            })        
            return {
                ...newComment
            }
        case ADD_COMMENT_VOTE : 
            state[action.comment.parentId].map((comment, i) => {
                if(comment.id === action.comment.id){
                    state[action.comment.parentId][i] = action.comment
                }}
            )
            return {
                ...state
            }
        case DISABLE_COMMENT:
                const disabled = {...state, [action.parentId]: [...state[action.parentId].filter(obj => obj.id !== action.id)]}
            return {
                ...disabled
            }
        default:
            return state
    }
}