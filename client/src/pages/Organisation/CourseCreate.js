import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { createCourse } from '../../redux/actions/courseAction';

const CourseCreate = () => {

    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.userLogin);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createCourse({ title, description }));
    };


    return (
        <FormContainer>
            <h1>Create Course</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='title'>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='description' className='my-3'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>
                <Button type='submit' className='my-3' variant='primary'>
                    CREATE
                </Button>

            </Form>
        </FormContainer>
    );
};

export default CourseCreate;
