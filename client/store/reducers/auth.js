let initialState = {
    token: null,
    id: null,
    name: null,
}

export const getUserTokenReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SUCCESS':
            return {
                ...state,
                token: action.payload.token,
                id: action.payload.id,
                name: action.payload.name,
            }
        default:
            return state
    }
}