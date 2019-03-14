import * as API from '../api'

export const SEARCH = 'SEARCH'

function search (result){
    return {
        type: SEARCH,
        result
    }
}

function exist(post, query){
    query = query.toLowerCase()
    if(post.title.toLowerCase().includes(query) || post.author.toLowerCase().includes(query) || post.body.toLowerCase().includes(query) ){
        return true
    }
    return false
}

export function handleSearch (query) {
    return (dispatch) => {
        return API.getAllPosts()
        .then(res => 
            dispatch(search(res.filter(post => exist(post, query))))
        )
    }
}