import api from '../../manage'

export const getUserTokenAction = () => dispatch => {
    api.get('account/getusertoken/')
    .then(response => {
        dispatch({
            type: 'SUCCESS',
            payload: {
                token: response.data.accessToken,
                id: response.data.id,
                name: response.data.name,
            },
        })
    })
    .catch(error => {
        dispatch({
            type: 'ERROR',
            payload: {
                message: 'unable to get the user token',
            },
        })
    })
}