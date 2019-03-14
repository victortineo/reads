import {combineReducers} from 'redux'
import posts from './posts'
import comments from './comments'
import categories from './categories'
import order from './order'
import search from './search'

export default combineReducers({
    posts,
    comments,
    categories,
    order,
    search
})
