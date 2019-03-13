export const GET_CATEGORIES = "GET_CATEGORIES"

function getCategories (categories){
    return {
        type: GET_CATEGORIES,
        categories
    }
}

export function handleGetCategories (categories) {
    return (dispatch) => {
        dispatch(getCategories(categories))
    }
}