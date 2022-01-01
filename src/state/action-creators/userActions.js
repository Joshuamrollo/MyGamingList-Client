import {axiosInstance} from '../../config';

export const getUser = (user) => dispatch => {
    dispatch(setUserLoading());
    axiosInstance
        .get('/api/users/reg', user)
        .then(res => dispatch({
            type: 'getUser',
            user: res.data
        }))
}

export const setUserLoading = () => {
    return{
        type: 'loading'
    }
}