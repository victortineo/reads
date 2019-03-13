const headers = {'Authorization': 'whatever-you-want', "Content-Type": "application/json"}
const baseURL = 'http://127.0.0.1:3001/'
// GET METHODS
export const getInitialData = () => 
    Promise.all([getAllPosts(), getCategories()])

export const getAllPosts = () => 
    fetch(`${baseURL}posts`, 
        {
            method: 'GET', 
            headers: {
                ...headers}
        }
    )
    .then(res => res.json())

export const getPost = (id) => 
    fetch(`${baseURL}posts/${id}`, 
        {
            method: 'GET', 
            headers: {
                ...headers}
        }
    )
    .then(res => res.json())

export const getCategories = () => 
    fetch(`${baseURL}categories`, 
        {
            method: 'GET', 
            headers: {
                ...headers}         
        }   
    )
    .then(res => res.json())
export const getCommentsByParent = (parent) => 
    fetch(`${baseURL}posts/${parent}/comments`, 
        {
            method: 'GET', 
            headers: {
                ...headers}
            
        }   
    )
    .then(res => res.json())

export const getComment = (id) => 
    fetch(`${baseURL}comments/${id}`, 
        {
            method: 'GET', 
            headers: {
                ...headers}
        }
    )
    .then(res => res.json())


// POST METHODS
export const addPost = post =>
    fetch(`${baseURL}posts`, {
        method: "POST",
        headers: {
          ...headers
        },
        body: JSON.stringify(post)
    })
    .then(res => res.json())

export const addPostComment = (comment) =>
    fetch(`${baseURL}comments/`, {
        method: "POST",
        headers: {
          ...headers
        },
        body: JSON.stringify(comment)
    })
    .then(res => res.json())
    
export const votePost = (option, id) =>
        fetch(`${baseURL}posts/${id}`, {
            method: "POST",
            headers: {
                ...headers
            },
            body: JSON.stringify({ option })
        })
        .then(res => res.json())

export const voteComment = (option, id) =>
        fetch(`${baseURL}comments/${id}`, {
            method: "POST",
            headers: {
                ...headers
            },
            body: JSON.stringify({ option })
        })
        .then(res => res.json())

// PUT methods

export const editPost = (post, id) =>
    fetch(`${baseURL}posts/${id}`, {
        method: "PUT",
        headers: {
            ...headers
        },
        body: JSON.stringify(post)
    })
    .then(res => res.json())

export const editPostComment = (id, comment) =>
    fetch(`${baseURL}comments/${id}`, {
        method: "PUT",
        headers: {
            ...headers
        },
        body: JSON.stringify(comment)
    })
    .then(res => res.json())

// DELETE METHODS

export const deletePost = (id) => 
    fetch(`${baseURL}posts/${id}`, {
        method: "DELETE",
        headers: {
            ...headers
        }})
        .then(res => res.json())

export const deleteComment = (id) => 
    fetch(`${baseURL}comments/${id}`, {
        method: "DELETE",
        headers: {
            ...headers
        }})
        .then(res => res.json())