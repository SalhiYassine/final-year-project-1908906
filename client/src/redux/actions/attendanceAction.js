import axios from 'axios'

import { ATTENDANCE_CREATE_REQUEST, ATTENDANCE_CREATE_SUCCESS, ATTENDANCE_CREATE_FAIL } from '../constants/attendanceConstants'


axios.defaults.withCredentials = true;
axios.defaults.headers = { headers: { 'Content-Type': 'application/json' } };


export const createCourse = (course_id, email) => async (dispatch) => {
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
