import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { getOneCourses } from '../../redux/actions/courseAction';
import { createSession } from '../../redux/actions/sessionAction';
import { LinkContainer } from 'react-router-bootstrap';

const SessionUpdate = ({ match, history }) => {

    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.sessionUpdate);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [url, setUrl] = useState('');
    const [location, setLocation] = useState('');
    const [title, setTitle] = useState('');
    const [hybrid, setHybrid] = useState('Online');
    const [guests, setGuests] = useState(false);
    const submitHandler = (e) => {
        e.preventDefault();
        const session = ({ title, hybrid, guests, startDate, endDate, url, location })
        const id = match.params.id;
        dispatch(createSession(session, id));
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
                <h2 className='my-3'>Create Session</h2>
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
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
                        CREATE
                    </Button>

                </Form>
            </FormContainer>
        </>
    );
};

export default SessionUpdate;
