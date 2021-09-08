export const setUserAction =(n_user)=>{
    return {
        type:'SET',
        payload:n_user
    }
}

export const clearUserAction = ()=>{
    return {
        type:'CLEAR'
    }
}

