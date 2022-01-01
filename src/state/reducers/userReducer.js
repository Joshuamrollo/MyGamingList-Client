const initialState = {
    user: null,
    game: null,
    loading: false
}

const gameReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'getUser':
            return {
                ...state,
                user: action.user,
                loading: false
            }
        case "loading":
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}

export default gameReducer;