import axios from 'axios'

import { COURSE_CREATE_FAIL, COURSE_CREATE_REQUEST, COURSE_CREATE_SUCCESS } from '../constants/courseConstants'


axios.defaults.withCredentials = true;
axios.defaults.headers = { headers: { 'Content-Type': 'application/json' } };


export const createCourse = (course) => async (dispatch) => {
    try {
        dispatch({ type: COURSE_CREATE_REQUEST });

        const { data } = await axios.post('/api/course', course);

        dispatch({ type: COURSE_CREATE_SUCCESS, payload: data });

    } catch (error) {
        dispatch({
            type: COURSE_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
