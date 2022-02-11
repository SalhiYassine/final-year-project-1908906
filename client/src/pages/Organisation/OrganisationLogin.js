import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { loginOrg } from '../../redux/actions/organisationAction';
import FormContainer from '../../components/FormContainer';
import { useSelector, useDispatch } from 'react-redux';

const LoginPage = ({ history, location }) => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.userLogin);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const path = window.location.search.split('=')[1]
        ? window.location.search.split('=')[1]
        : '';

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(loginOrg(email, password));
    };

    useEffect(() => {
        return () => { };
    }, [history, location]);

    return (
        <FormContainer>
            <h1>Sign in</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
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
                <Button type='submit' className='my-3' variant='primary'>
                    Login
                </Button>
                <Row>
                    <Col>
                        New Customer?
                        <Link to={path ? `/organisation/register?redirect=${path}` : '/organisation/register'}>
                            Register
                        </Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    );
};

export default LoginPage;