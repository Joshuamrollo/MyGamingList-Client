const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    user: null
};

export default function auths(state = initialState, action) {
    switch(action.type) {
        case 'USER_LOADING':
            return {
                ...state,
                isLoading: true
            }
        case 'USER_LOADED':
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
            };
        case 'AUTH_ERROR':
        case 'LOGIN_FAIL':
        case 'LOGOUT_SUCCESS':
        case 'REGISTER_FAIL':
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            }
        case "addToList":
            if(action.user === null) return {...state};
            //if(action.user.list[action.game]) return {...state};
            return {
                ...state,
                user: {...action.user, list: {...action.user.list, [action.game._id]: -1}}
            }
        case "deleteFromList": 
            const newList = action.user.list;
            delete newList[action.game._id];
            return {
                ...state,
                user: {...action.user, list: {...newList}}
            }
        case "rating":
            return {
                ...state,
                user: action.payload
            }
        default: 
            return state
    }
}