import {axiosInstance} from '../../config';
import { returnErrors } from './errorActions';

export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: 'USER_LOADING' });

    axiosInstance.get('/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: 'USER_LOADED',
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
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

    axiosInstance.post('/api/users/reg', body, config)
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

    axiosInstance.post('/api/auth', body, config)
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

    axiosInstance.post('/api/users/game', body)
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

    axiosInstance.post('/api/users/game', body)
        .catch(err => {
            dispatch(returnErrors());
        })
}

export const deleteRatingFromGame = (game, user) => dispatch => {
    const body = { game, user };

    axiosInstance.post('/api/games/deleteRatings', body)
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

    axiosInstance.post('/api/users/rate', body)
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