import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { register } from '../../redux/actions/userAction';
import FormContainer from '../../components/FormContainer';
import { useSelector, useDispatch } from 'react-redux';

const RegisterPage = ({ history, location }) => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector(
        (state) => state.userRegister
    );
    const [username, setUsername] = useState('');
    const [surname, setSurname] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const path = window.location.search.split('=')[1]
        ? window.location.search.split('=')[1]
        : '';

    const submitHandler = (e) => {
        e.preventDefault();
        if (password === passwordConfirmation) {
            setMessage('');
            dispatch(register({ name, email, password, surname, username }));
        } else {
            setMessage('Passwords do not match!');
        }
    };

    useEffect(() => {
        return () => {
            setMessage('');
        };
    }, [history, location]);

    return (
        <FormContainer>
            <h1>Register</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='username' className='my-3'>
                    <Form.Label>Userame</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Userame'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group><Form.Group controlId='name' className='my-3'>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter First Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='surname' className='my-3'>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Last Name'
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='password' className='my-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='confirmPassword' className='my-3'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm password'
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                </Form.Group>
                <Button type='submit' className='my-3' variant='primary'>
                    Register
                </Button>
                <Row>
                    <Col>
                        Already a customer?
                        <Link to={path ? `/login?redirect=${path}` : `/login`}>Log in</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    );
};

export default RegisterPage;