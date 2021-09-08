import {combineReducers} from 'redux'

const initial_state = null;

const userReducer = (state=initial_state, action)=>{
    switch(action.type){
        case 'SET':
            return action.payload
        case 'CLEAR':
            return null
        default:
            return state
    }
}

const rootReducer = combineReducers({
    user:userReducer
});

export default rootReducer;

