import axios from 'axios'

import {
    COURSE_CREATE_FAIL, COURSE_CREATE_REQUEST, COURSE_CREATE_SUCCESS,
    COURSE_ADD_PARTICIPANT_REQUEST, COURSE_ADD_PARTICIPANT_SUCCESS, COURSE_ADD_PARTICIPANT_FAIL,
    COURSE_GET_ALL_REQUEST, COURSE_GET_ALL_SUCCESS, COURSE_GET_ALL_FAIL,
    COURSE_GET_ONE_REQUEST, COURSE_GET_ONE_SUCCESS, COURSE_GET_ONE_FAIL, COURSE_DELETE_PARTICIPANT_REQUEST, COURSE_DELETE_PARTICIPANT_SUCCESS, COURSE_DELETE_PARTICIPANT_FAIL

} from '../constants/courseConstants'


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

export const addParticipantCourse = (course_id, email) => async (dispatch) => {
    try {
        dispatch({ type: COURSE_ADD_PARTICIPANT_REQUEST });

        const { data } = await axios.post(`/api/course/${course_id}/participant`, { email });

        dispatch({ type: COURSE_ADD_PARTICIPANT_SUCCESS, payload: data });

    } catch (error) {
        dispatch({
            type: COURSE_ADD_PARTICIPANT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};


export const removeParticipantCourse = (course_id, email) => async (dispatch) => {
    try {
        dispatch({ type: COURSE_DELETE_PARTICIPANT_REQUEST });

        const { data } = await axios.put(`/api/course/${course_id}/participant`, { email });

        dispatch({ type: COURSE_DELETE_PARTICIPANT_SUCCESS, payload: data });

    } catch (error) {
        dispatch({
            type: COURSE_DELETE_PARTICIPANT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getAllCourses = () => async (dispatch) => {
    try {
        dispatch({ type: COURSE_GET_ALL_REQUEST });

        const { data } = await axios.get(`/api/course`);

        dispatch({ type: COURSE_GET_ALL_SUCCESS, payload: data });

    } catch (error) {
        dispatch({
            type: COURSE_GET_ALL_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getOneCourses = (id) => async (dispatch) => {
    try {
        dispatch({ type: COURSE_GET_ONE_REQUEST });

        const { data } = await axios.get(`/api/course/${id}`);

        dispatch({ type: COURSE_GET_ONE_SUCCESS, payload: data });

    } catch (error) {
        dispatch({
            type: COURSE_GET_ONE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
