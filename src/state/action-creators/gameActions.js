import {axiosInstance} from '../../config';
import { returnErrors } from './errorActions';
import axios from 'axios';

export const getGames = () => dispatch => {
    dispatch(setGamesLoading());
    axios
        .get('https://mygaminglist-api-jmr.herokuapp.com/api/games/get', {mode: 'no-cors'})
        .then(res => dispatch({
            type: 'getGames',
            payload: res.data
        }))
}

export const sortGames = (games) => {
    const array = games;
    let finished = false;
	let counter = 0;
	let temp = 0;
	while(!finished){
		finished = true;
		for(let i = 0; i < array.length - 1 - counter; i++){
            let one = rate(array[i]);
            let two = rate(array[i + 1]);
			if(one < two){
				temp = array[i];
				array[i] = array[i + 1];
				array[i + 1] = temp;
				finished = false;
			}
		}
		counter++;
	}

    function rate(game) {
        if(game.ratings){
            let sum = 0;
            let counter = 0;
            Object.keys(game.ratings).map((key) => {
                if(game.ratings[key] !== -1){
                    sum += game.ratings[key];
                    counter++;
                }
            })

            return sum / counter;
        }else {
            return -1
        }
    }

    return(dispatch) => {
        dispatch({
            type: 'sort',
            payload: array
        })
    }
}

export const sortGames2 = (sortedGames) => {
    return(dispatch) => {
        dispatch({
            type: 'sort',
            payload: sortedGames
        })
    }
}

export const getSearchGames = (newGames) => {
    return(dispatch) => {
        dispatch({
            type: 'search',
            payload: newGames
        })
    }
}

export const addRatingToGame = (num, games, game, user) => {
    const newGames = games;

    for(let i = 0; i < newGames.length; i++){
        if(newGames[i]._id === game._id){
            if(!newGames[i].ratings)newGames[i].ratings = {};
            newGames[i].ratings[user.id] = num;

        }
    }

    return (dispatch) => {
        dispatch({
            type: 'rate',
            payload: newGames
        })
    }
}

export const addRatingToGame2 = (num, game, user) => dispatch => {

    const body = { game, num, user }

    axios.post('https://mygaminglist-api-jmr.herokuapp.com/api/games/rating', {mode: 'no-cors'}, body)
        .catch(err => {
            dispatch(returnErrors());
        })
}

export const addGameToList = (game) => {
    return (dispatch) => {
        dispatch({
            type: 'add',
            payload: game
        })
    }
}

export const deletegameFromList = (game) => {
    return (dispatch) => {
        dispatch({
            type: 'delete',
            payload: game
        })
    }
}

export const setGamesLoading = () => {
    return{
        type: 'loading'
    }
}

export const deleteRatingFromGame2 = (games, game, user) => dispatch => {
    const newGame = game;
    const newGames = games
    delete newGame[user.id];

    for(let i = 0; i < newGames.length; i++){
        if(newGames[i] === game){
            newGames[i] = newGame;
        }
    }

    return (dispatch) => {
        dispatch({
            type: 'deleteRating',
            payload: games
        })
    }
}