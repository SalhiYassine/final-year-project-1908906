import axios from 'axios'

import {
    ATTENDANCE_CREATE_REQUEST, ATTENDANCE_CREATE_SUCCESS, ATTENDANCE_CREATE_FAIL,
    ATTENDANCE_GET_PARTICIPANT_REQUEST, ATTENDANCE_GET_PARTICIPANT_SUCCESS, ATTENDANCE_GET_PARTICIPANT_FAIL
    , ATTENDANCE_CREATE_ORGANISATION_REQUEST, ATTENDANCE_CREATE_ORGANISATION_SUCCESS, ATTENDANCE_CREATE_ORGANISATION_FAIL,
    ATTENDANCE_EDIT_REQUEST, ATTENDANCE_EDIT_SUCCESS, ATTENDANCE_EDIT_FAIL,
    ATTENDANCE_DELETE_REQUEST, ATTENDANCE_DELETE_SUCCESS, ATTENDANCE_DELETE_FAIL

} from '../constants/attendanceConstants'


axios.defaults.withCredentials = true;
axios.defaults.headers = { headers: { 'Content-Type': 'application/json' } };


export const createAttendanceOrg = (session_id, participant_id, record) => async (dispatch) => {
    try {
        dispatch({ type: ATTENDANCE_CREATE_ORGANISATION_REQUEST });

        const { data } = await axios.post(`/api/attendance/${session_id}/${participant_id}/org`, record);

        dispatch({ type: ATTENDANCE_CREATE_ORGANISATION_SUCCESS, payload: data });

    } catch (error) {
        dispatch({
            type: ATTENDANCE_CREATE_ORGANISATION_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};


export const createAttendance = (session_id, url) => async (dispatch) => {
    try {
        window.open(url, '_blank').focus();
        dispatch({ type: ATTENDANCE_CREATE_REQUEST });

        const { data } = await axios.post(`/api/attendance/${session_id}`);

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

export const updateRecord = (s_id, body) => async (dispatch) => {
    try {
        dispatch({ type: ATTENDANCE_EDIT_REQUEST });

        const { data } = await axios.put(`/api/attendance/${s_id}`, body);

        dispatch({ type: ATTENDANCE_EDIT_SUCCESS, payload: data });

    } catch (error) {
        dispatch({
            type: ATTENDANCE_EDIT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deleteRecord = (s_id, body) => async (dispatch) => {
    try {
        dispatch({ type: ATTENDANCE_DELETE_REQUEST });

        const { data } = await axios.patch(`/api/attendance/${s_id}`, body);

        dispatch({ type: ATTENDANCE_DELETE_SUCCESS, payload: data });

    } catch (error) {
        dispatch({
            type: ATTENDANCE_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};



