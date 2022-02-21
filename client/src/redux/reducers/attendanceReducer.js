import {
    ATTENDANCE_CREATE_REQUEST, ATTENDANCE_CREATE_SUCCESS, ATTENDANCE_CREATE_FAIL,
    ATTENDANCE_GET_PARTICIPANT_REQUEST, ATTENDANCE_GET_PARTICIPANT_SUCCESS, ATTENDANCE_GET_PARTICIPANT_FAIL,
    ATTENDANCE_EDIT_REQUEST, ATTENDANCE_EDIT_SUCCESS, ATTENDANCE_EDIT_FAIL,
    ATTENDANCE_DELETE_REQUEST, ATTENDANCE_DELETE_SUCCESS, ATTENDANCE_DELETE_FAIL,
    ATTENDANCE_CREATE_ORGANISATION_REQUEST, ATTENDANCE_CREATE_ORGANISATION_SUCCESS, ATTENDANCE_CREATE_ORGANISATION_FAIL


} from '../constants/attendanceConstants'


export const attendanceCreate = (state = {}, action) => {
    switch (action.type) {
        case ATTENDANCE_CREATE_REQUEST:
            return { loading: true };
        case ATTENDANCE_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                attendance: action.payload,
            };
        case ATTENDANCE_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export const attendanceUpdate = (state = {}, action) => {
    switch (action.type) {
        case ATTENDANCE_EDIT_REQUEST:
            return { loading: true };
        case ATTENDANCE_EDIT_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case ATTENDANCE_EDIT_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export const attendanceDelete = (state = {}, action) => {
    switch (action.type) {
        case ATTENDANCE_DELETE_REQUEST:
            return { loading: true };
        case ATTENDANCE_DELETE_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case ATTENDANCE_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};



export const attendanceCreateOrg = (state = {}, action) => {
    switch (action.type) {
        case ATTENDANCE_CREATE_ORGANISATION_REQUEST:
            return { loading: true };
        case ATTENDANCE_CREATE_ORGANISATION_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case ATTENDANCE_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};


export const attendanceGetParticipant = (state = {}, action) => {
    switch (action.type) {
        case ATTENDANCE_GET_PARTICIPANT_REQUEST:
            return { loading: true };
        case ATTENDANCE_GET_PARTICIPANT_SUCCESS:
            return {
                loading: false,
                success: true,
                records: action.payload,
            };
        case ATTENDANCE_GET_PARTICIPANT_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};