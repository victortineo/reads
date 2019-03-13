import {POSTS_ORDER_BY} from '../actions/order'

export default function posts (state = {}, action){
    switch(action.type){
        case POSTS_ORDER_BY: 
        return {
            ...state,
            orderBy: action.order
        }
        default:
            return state
        }
    }