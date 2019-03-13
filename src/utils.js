export function orderBy(objs, key){
    let newKey;
    switch(key){
        case 'like+':
            newKey = 'voteScore'
            break
        case 'like-':
            newKey = 'voteScore'
            break
        case 'date+':
            newKey = 'timestamp'
            break
        case 'date-':
            newKey = 'timestamp'
            break
        default:
            newKey = key
    }
    let newObjs = objs.sort((a,b) => (a[newKey] < b[newKey]) ? 1 : ((b[newKey] < a[newKey]) ? -1 : 0))
    
    return key ? key.includes('-') ? newObjs.reverse() : newObjs :  objs
}