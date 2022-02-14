import {
    COURSE_CREATE_FAIL, COURSE_CREATE_REQUEST, COURSE_CREATE_SUCCESS,
    COURSE_ADD_PARTICIPANT_REQUEST, COURSE_ADD_PARTICIPANT_SUCCESS, COURSE_ADD_PARTICIPANT_FAIL,
    COURSE_GET_ALL_REQUEST, COURSE_GET_ALL_SUCCESS, COURSE_GET_ALL_FAIL,
    COURSE_GET_ONE_REQUEST, COURSE_GET_ONE_SUCCESS, COURSE_GET_ONE_FAIL
} from '../constants/courseConstants'


export const courseCreate = (state = {}, action) => {
    switch (action.type) {
        case COURSE_CREATE_REQUEST:
            return { loading: true };
        case COURSE_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                course: action.payload,
            };
        case COURSE_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export const courseAddParticipant = (state = {}, action) => {
    switch (action.type) {
        case COURSE_ADD_PARTICIPANT_REQUEST:
            return { loading: true };
        case COURSE_ADD_PARTICIPANT_SUCCESS:
            return {
                loading: false,
                success: true,
                response: action.payload,
            };
        case COURSE_ADD_PARTICIPANT_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export const courseGetAll = (state = {}, action) => {
    switch (action.type) {
        case COURSE_GET_ALL_REQUEST:
            return { loading: true };
        case COURSE_GET_ALL_SUCCESS:
            return {
                loading: false,
                success: true,
                courses: action.payload,
            };
        case COURSE_GET_ALL_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};
export const courseGetOne = (state = {}, action) => {
    switch (action.type) {
        case COURSE_GET_ONE_REQUEST:
            return { loading: true };
        case COURSE_GET_ONE_SUCCESS:
            return {
                loading: false,
                success: true,
                course: action.payload.course,
                sessions: action.payload.sessions,
            };
        case COURSE_GET_ONE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};