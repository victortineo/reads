export const POSTS_ORDER_BY = "POSTS_ORDER_BY"

function orderBy (order){
    return {
        type: POSTS_ORDER_BY,
        order
    }
}

export function handleOrderBy (order) {
    return (dispatch) => {
        dispatch(orderBy(order))
    }
}