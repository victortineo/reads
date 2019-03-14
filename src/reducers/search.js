import {SEARCH} from '../actions/search'

export default function results (state = {}, action){
    switch(action.type){
        case SEARCH: 
            return {
                ...action.result
            }
        default:
            return state
        }
    }