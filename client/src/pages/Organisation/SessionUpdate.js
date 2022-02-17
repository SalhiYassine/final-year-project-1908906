import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { getOneCourses } from '../../redux/actions/courseAction';
import { createSession, getOneSession, updateSession } from '../../redux/actions/sessionAction';
import { LinkContainer } from 'react-router-bootstrap';

const SessionUpdate = ({ match, history }) => {

    const dispatch = useDispatch();
    const { loading, error, session } = useSelector((state) => state.sessionGetOne);
    const { loading: loadingUpdate, error: errorUpdate } = useSelector((state) => state.sessionUpdate);

    useEffect(() => {
        dispatch(getOneSession(match.params.id))

    }, [])

    useEffect(() => {
        if (!loading && !error && session) {
            const { start_date, end_date, guests, hybrid, location, title, url } = session;
            setStartDate(Date.parse(start_date))
            setEndDate(Date.parse(end_date))
            setGuests(guests)
            setHybrid(hybrid)
            setLocation(location)
            setTitle(title)
            setUrl(url)
        }
    }, [session, error, loading])

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [url, setUrl] = useState();
    const [location, setLocation] = useState();
    const [title, setTitle] = useState();
    const [hybrid, setHybrid] = useState();
    const [guests, setGuests] = useState();

    const submitHandler = (e) => {
        e.preventDefault();
        const session = ({ title, hybrid, guests, startDate, endDate, url, location })
        const id = match.params.id;
        dispatch(updateSession(session, id));
    };

    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);

        return currentDate.getTime() < selectedDate.getTime();
    };

    const filterEndPassedTime = (time) => {
        const currentDate = startDate;
        const selectedDate = new Date(time);
        return currentDate.getTime() < selectedDate.getTime();
    };

    const startDataChangeHandler = (date) => {
        if (date > new Date()) {
            setStartDate(date)
            if (endDate < date) {
                setEndDate(date)
            }
        }
    }

    const endDataChangeHandler = (date) => {
        if (date > startDate) {
            setEndDate(date)
        }
    }

    return (
        <>

            <ol className="breadcrumb m-4">
                <LinkContainer to={`/`} as='div'>
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                </LinkContainer>
                <LinkContainer to={`/course/${match.params.id}`} as='div'>
                    <li className="breadcrumb-item"><a href="#">Course</a></li>
                </LinkContainer>
                <li className="breadcrumb-item active">Session</li>
            </ol>
            <LinkContainer className='m-4' to={`/course/${match.params.id}`} as='div'>
                <Button variant='outline-dark'>
                    Back
                </Button>
            </LinkContainer>
            <FormContainer >
                <h2 className='my-3'>Update Session</h2>
                {error && <Message variant='danger'>{error}</Message>}
                {loading ? <Loader /> :

                    session ?

                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='title'>
                                <Form.Label>Title </Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter title'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId='hybrid' className='my-3'>
                                <Form.Label>Attendance</Form.Label>
                                <select className="form-select" onChange={(e) => setHybrid(e.target.value)} value={hybrid} id="Select">
                                    <option>Online</option>
                                    <option>In-Person</option>
                                    <option>Hybrid</option>
                                </select>
                            </Form.Group>
                            {(hybrid === 'Online' || hybrid === 'Hybrid') &&
                                <>
                                    <Form.Label>Online URL</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter a URL'
                                        className='mb-3'
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                    />
                                </>
                            }
                            {(hybrid === 'In-Person' || hybrid === 'Hybrid') &&
                                <>
                                    <Form.Label>In-Person Address</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter a Location'
                                        className='mb-3'
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}

                                    />
                                </>
                            }

                            <Form.Group controlId='guests' className='my-3 d-flex'>
                                <Form.Label>Guests</Form.Label>
                                <Form.Check
                                    className='mx-3'
                                    type='checkbox'
                                    value={guests}
                                    onChange={(e) => setGuests(!guests)}
                                />
                            </Form.Group>
                            <Form.Label>Start Time</Form.Label>
                            <DatePicker
                                className='form-control mb-3'
                                selected={startDate}
                                onChange={(date) => startDataChangeHandler(date)}
                                timeInputLabel="Time:"
                                dateFormat="dd/MM/yyyy h:mm aa"
                                showTimeSelect
                                minDate={new Date()}
                                filterTime={filterPassedTime}

                            />
                            <Form.Label>End Time</Form.Label>

                            <DatePicker
                                className='form-control mb-3'
                                selected={endDate}
                                onChange={(date) => endDataChangeHandler(date)}
                                timeInputLabel="Time:"
                                dateFormat="dd/MM/yyyy h:mm aa"
                                showTimeSelect
                                minDate={startDate}
                                filterTime={filterEndPassedTime}

                            />


                            <Button type='submit' className='my-3' variant='primary'>
                                UPDATE
                            </Button>

                        </Form>
                        : <Loader />}
            </FormContainer>
        </>
    );
};

export default SessionUpdate;
