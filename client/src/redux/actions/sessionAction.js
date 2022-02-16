import axios from 'axios'

import { SESSION_CREATE_REQUEST, SESSION_CREATE_SUCCESS, SESSION_CREATE_FAIL, SESSION_UPDATE_REQUEST, SESSION_UPDATE_SUCCESS, SESSION_UPDATE_FAIL, SESSION_GET_REQUEST, SESSION_GET_SUCCESS, SESSION_GET_FAIL, SESSION_DELETE_REQUEST, SESSION_DELETE_SUCCESS, SESSION_DELETE_FAIL } from '../constants/sessionConstants'


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

export const updateSession = (session, course_id) => async (dispatch) => {
    try {
        dispatch({ type: SESSION_UPDATE_REQUEST });

        const { data } = await axios.put(`/api/session/${course_id}`, session);

        dispatch({ type: SESSION_UPDATE_SUCCESS, payload: data });

    } catch (error) {
        dispatch({
            type: SESSION_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getOneSession = (session_id) => async (dispatch) => {
    try {
        dispatch({ type: SESSION_GET_REQUEST });

        const { data } = await axios.get(`/api/session/${session_id}`);

        dispatch({ type: SESSION_GET_SUCCESS, payload: data });

    } catch (error) {
        dispatch({
            type: SESSION_GET_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deleteOneSession = (session_id) => async (dispatch) => {
    try {
        dispatch({ type: SESSION_DELETE_REQUEST });

        const { data } = await axios.delete(`/api/session/${session_id}`);

        dispatch({ type: SESSION_DELETE_SUCCESS, payload: data });

    } catch (error) {
        dispatch({
            type: SESSION_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};