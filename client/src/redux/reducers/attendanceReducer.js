import { ATTENDANCE_CREATE_REQUEST, ATTENDANCE_CREATE_SUCCESS, ATTENDANCE_CREATE_FAIL } from '../constants/attendanceConstants'


export const courseCreate = (state = {}, action) => {
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