import axios from 'axios'

import { SESSION_CREATE_REQUEST, SESSION_CREATE_SUCCESS, SESSION_CREATE_FAIL } from '../constants/sessionConstants'


axios.defaults.withCredentials = true;
axios.defaults.headers = { headers: { 'Content-Type': 'application/json' } };


export const createSession = (session, course_id) => async (dispatch) => {
    try {
        dispatch({ type: SESSION_CREATE_REQUEST });

        const { data } = await axios.post(`/api/session/${course_id}`, session);

        dispatch({ type: SESSION_CREATE_SUCCESS, payload: data });

    } catch (error) {
        dispatch({
            type: SESSION_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
