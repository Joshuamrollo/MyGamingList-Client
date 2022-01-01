import {axiosInstance} from '../../config';
import axios from 'axios';
import { returnErrors } from './errorActions';

export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: 'USER_LOADING' });

    axios.get('https://mygaminglist-api-jmr.herokuapp.com/api/auth/user', {mode: 'no-cors'}, tokenConfig(getState))
        .then(res => dispatch({
            type: 'USER_LOADED',
            payload: res.data
        }))
        .catch(err => {
            dispatch({
                type: 'AUTH_ERROR'
            })
        })
};

export const register = ({name, email, password}) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({name, email, password});

    axios.post('https://mygaminglist-api-jmr.herokuapp.com/api/users/reg', {mode: 'no-cors'}, body, config)
        .then(res => dispatch({
            type: 'REGISTER_SUCCESS',
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: 'REGISTER_FAIL'
            })
        })
}

export const login = ({email, password}) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({email, password});

    axios.post('https://mygaminglist-api-jmr.herokuapp.com/api/auth/login', {mode: 'no-cors'}, body, config)
        .then(res => dispatch({
            type: 'LOGIN_SUCCESS',
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: 'LOGIN_FAIL'
            })
        })
}

export const logout = () => {
    return {
        type: 'LOGOUT_SUCCESS'
    }
}

export const addGameToUser = (game, user) => {
    return (dispatch) => {
        dispatch({
            type: 'addToList',
            user: user,
            game: game
        })
    }
}

export const addGameToUser2 = (game, user) => dispatch => {
    const id = user.id;
    const list = {...user.list, [game._id]: -1};

    const body = { list, id };

    axios.post('https://mygaminglist-api-jmr.herokuapp.com/api/users/game', {mode: 'no-cors'}, body)
        .catch(err => {
            dispatch(returnErrors());
        })
}

export const deleteGameFromUser = (game, user) => {
    return (dispatch) => {
        dispatch({
            type: 'deleteFromList',
            user: user,
            game: game
        })
    }
}

export const deleteGameFromUser2 = (game, user) => dispatch => {
    const id = user.id;
    const list = user.list;
    delete list[game._id];

    const body = { list, id };

    axios.post('https://mygaminglist-api-jmr.herokuapp.com/api/users/game', {mode: 'no-cors'}, body)
        .catch(err => {
            dispatch(returnErrors());
        })
}

export const deleteRatingFromGame = (game, user) => dispatch => {
    const body = { game, user };

    axios.post('https://mygaminglist-api-jmr.herokuapp.com/api/games/deleteRatings', {mode: 'no-cors'}, body)
        .catch(err => {
            dispatch(returnErrors());
        })
}

export const addRatingToUser = (num, game, user) => {
    const newUser = user;
    newUser.list[game._id] = num;

    return (dispatch) => {
        dispatch({
            type: 'rating',
            payload: newUser
        })
    }
}

export const addRatingToUser2 = (num, game, user) => dispatch => {
    const id = user.id;
    const list = user.list;
    list[game._id] = num;

    const body = { list, id };

    axios.post('https://mygaminglist-api-jmr.herokuapp.com/api/users/rate', {mode: 'no-cors'}, body)
        .catch(err => {
            dispatch(returnErrors());
        })
}

export const tokenConfig = getState => {
    const token = getState().auth.token;

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    if(token){
        config.headers['x-auth-token'] = token;
    }
}