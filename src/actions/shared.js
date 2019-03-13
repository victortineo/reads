import { handleGetAllPosts } from '../actions/posts'
import { handleGetCategories } from '../actions/categories'
import {getInitialData} from '../api'

export function handleInitialData () {
    return (dispatch) => {
      return getInitialData()
        .then((res)  => (
            dispatch(handleGetAllPosts(res[0])),
            dispatch(handleGetCategories(res[1].categories))
          )
        )
      }
    }