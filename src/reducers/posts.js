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
                    return action.post 
                }
                return post
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
            const newState = Object.values(state).map(function(post, i){
                if(post.id === action.post.id){
                    return action.post 
                }
                return post
            }) 
        return {
            ...newState,
        }
        case COMMENT_COUNTER :
            const nextState = Object.values(state).map(function(post, i){
                if(post.id === action.id){
                    return {
                        ...post,
                        commentCount: post.commentCount + action.value
                    }
                }
                return post
            }) 
        return {
            ...nextState
        }
        case ADD_POST_VOTE : 
            const newVote = Object.values(state)
            newVote.map(function(post, i){
                if(post.id === action.post.id){
                    return action.post 
                }
                return post
            })
            return {
                ...newVote
            }
        case DISABLE_POST:
            const disabled = Object.values(state).map(function(post, i){
                if(post.id === action.id){
                    return {
                        ...post,
                        deleted: true
                    }
                }
                return post
            })
            return {
                ...disabled
            }
        default:
            return state
    }
}