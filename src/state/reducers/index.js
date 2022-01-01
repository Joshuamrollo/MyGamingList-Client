import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';

const reducers = combineReducers({
    games: gameReducer,
    error: errorReducer,
    auth: authReducer,
    user: userReducer
})

export default reducers;