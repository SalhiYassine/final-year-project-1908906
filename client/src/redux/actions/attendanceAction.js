import axios from 'axios'

import {
    ATTENDANCE_CREATE_REQUEST, ATTENDANCE_CREATE_SUCCESS, ATTENDANCE_CREATE_FAIL,
    ATTENDANCE_GET_PARTICIPANT_REQUEST, ATTENDANCE_GET_PARTICIPANT_SUCCESS, ATTENDANCE_GET_PARTICIPANT_FAIL

} from '../constants/attendanceConstants'


axios.defaults.withCredentials = true;
axios.defaults.headers = { headers: { 'Content-Type': 'application/json' } };


export const createAttendance = (course_id, email) => async (dispatch) => {
    try {
        dispatch({ type: ATTENDANCE_CREATE_REQUEST });

        const { data } = await axios.post('/api/attendance/', email);

        dispatch({ type: ATTENDANCE_CREATE_SUCCESS, payload: data });

    } catch (error) {
        dispatch({
            type: ATTENDANCE_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getParticipantRecord = () => async (dispatch) => {
    try {
        dispatch({ type: ATTENDANCE_GET_PARTICIPANT_REQUEST });

        const { data } = await axios.post('/api/attendance/participant');

        dispatch({ type: ATTENDANCE_GET_PARTICIPANT_SUCCESS, payload: data });

    } catch (error) {
        dispatch({
            type: ATTENDANCE_GET_PARTICIPANT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};


