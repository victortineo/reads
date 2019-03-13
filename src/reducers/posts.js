import { GET_POSTS, ADD_POST, EDIT_POST, COMMENT_COUNTER, ADD_POST_VOTE, DISABLE_POST, GET_POST} from '../actions/posts'

export default function posts (state = {}, action){
    switch(action.type){
        case GET_POSTS :
        return {
            ...action.posts
        }
        case GET_POST :
            const getPost = Object.values(state)
            getPost.map(function(post, i){
                if(post.id === action.post.id){
                    getPost[i] = action.post 
                }
            }) 
            return {
                ...getPost,
            }
        case ADD_POST :
        return {
            ...state,
            [action.post.id]: action.post
            
        }
        case EDIT_POST : 
            const newState = Object.values(state)
            newState.map(function(post, i){
                if(post.id === action.post.id){
                    newState[i] = action.post 
                }
            }) 
        return {
            ...newState,
        }
        case COMMENT_COUNTER :
            let nextState = Object.values(state)
            nextState.map(function(post, i){
                if(post.id === action.id){
                    nextState[i].commentCount = nextState[i].commentCount + 1
                }
            }) 
        return {
            ...state
        }
        case ADD_POST_VOTE : 
            let newVote = Object.values(state)
            newVote.map(function(post, i){
                if(post.id === action.post.id){
                    newVote[i] = action.post 
                }
            })
            return {
                ...newVote
            }
        case DISABLE_POST:
            state = Object.values(state).filter(obj => obj.id !== action.id)
            return {
                ...state
            }
        default:
            return state
    }
}