const initialState = {
    games: [],
    searchGames: [],
    sortedGames: [],
    loading: false
}

const gameReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'getGames':
            return {
                ...state,
                games: action.payload,
                loading: false
            }
        case "search":
            return {
                ...state,
                searchGames: action.payload
            }
        case "sort":
            return {
                ...state,
                games: action.payload,
                searchGames: action.payload,
                sortedGames: action.payload
            }
        case "add":
            return {
                ...state,
                games: state.games.push(action.payload)
            }
        case "delete": 
            return {
                ...state,
                games: state.games.filter(game => game.title !== action.payload)
            }
        case "delteRating":
            return {
                ...state,
                searchGames: action.payload
            }
        case "loading":
            return {
                ...state,
                loading: true
            }
        case "rate":
            return {
                ...state,
                games: action.payload
            }
        default:
            return state
    }
}

export default gameReducer;