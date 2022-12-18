import {getUserTokenReducer} from './reducers/auth'
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'

const reducer = combineReducers({
    getUserTokenReducer,
})

const middleware = [thunk]
export const store = createStore(reducer, compose(applyMiddleware(...middleware)))