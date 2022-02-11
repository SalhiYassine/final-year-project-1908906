import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { createSession } from '../../redux/actions/sessionAction';

const SessionCreate = () => {

    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.userLogin);
    const [title, setTitle] = useState('');
    const [hybrid, setHybrid] = useState(false);
    const [guests, setGuests] = useState(false);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createSession({ title, hybrid, guests }));
    };


    return (
        <FormContainer>
            <h1>Create Session</h1>
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
                    <Form.Label>Hybrid</Form.Label>
                    <Form.Check
                        type='checkbox'
                        checked={hybrid}
                        onChange={(e) => setHybrid(!hybrid)}
                    />
                </Form.Group>
                <Form.Group controlId='guests' className='my-3'>
                    <Form.Label>Guests</Form.Label>
                    <Form.Check
                        type='checkbox'
                        value={guests}
                        onChange={(e) => setGuests(!guests)}
                    />
                </Form.Group>
                <Button type='submit' className='my-3' variant='primary'>
                    CREATE
                </Button>

            </Form>
        </FormContainer>
    );
};

export default SessionCreate;
