import { SESSION_CREATE_REQUEST, SESSION_CREATE_SUCCESS, SESSION_CREATE_FAIL, SESSION_UPDATE_REQUEST, SESSION_UPDATE_SUCCESS, SESSION_UPDATE_FAIL, SESSION_GET_REQUEST, SESSION_GET_SUCCESS, SESSION_GET_FAIL, SESSION_DELETE_REQUEST, SESSION_DELETE_SUCCESS, SESSION_DELETE_FAIL } from '../constants/sessionConstants'


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

export const sessionUpdate = (state = {}, action) => {
    switch (action.type) {
        case SESSION_UPDATE_REQUEST:
            return { loading: true };
        case SESSION_UPDATE_SUCCESS:
            return {
                loading: false,
                success: true,
                session: action.payload,
            };
        case SESSION_UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export const sessionGetOne = (state = {}, action) => {
    switch (action.type) {
        case SESSION_GET_REQUEST:
            return { loading: true };
        case SESSION_GET_SUCCESS:
            return {
                loading: false,
                success: true,
                session: action.payload.session,
                attendance: action.payload.attendence,
            };
        case SESSION_GET_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export const sessionDeleteOne = (state = {}, action) => {
    switch (action.type) {
        case SESSION_DELETE_REQUEST:
            return { loading: true };
        case SESSION_DELETE_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case SESSION_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};