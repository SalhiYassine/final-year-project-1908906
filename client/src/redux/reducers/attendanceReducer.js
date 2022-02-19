import { ATTENDANCE_CREATE_REQUEST, ATTENDANCE_CREATE_SUCCESS, ATTENDANCE_CREATE_FAIL, ATTENDANCE_GET_PARTICIPANT_REQUEST, ATTENDANCE_GET_PARTICIPANT_SUCCESS, ATTENDANCE_GET_PARTICIPANT_FAIL } from '../constants/attendanceConstants'


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