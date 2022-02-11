import { SESSION_CREATE_REQUEST, SESSION_CREATE_SUCCESS, SESSION_CREATE_FAIL } from '../constants/sessionConstants'


export const sessionCreate = (state = {}, action) => {
    switch (action.type) {
        case SESSION_CREATE_REQUEST:
            return { loading: true };
        case SESSION_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                session: action.payload,
            };
        case SESSION_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};