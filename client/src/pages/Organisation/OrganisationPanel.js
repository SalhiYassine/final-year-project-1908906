import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { getAllCourses } from '../../redux/actions/courseAction';

const CourseCreate = () => {

    const dispatch = useDispatch();
    const { loading, error, success, courses } = useSelector((state) => state.courseGetAll);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (!success && !error) {
            dispatch(getAllCourses());
        }
    }, [success, error])





    return (
        <>
            <h1>Courses</h1>
            {loading ? <Loader /> :
                error ? <Message variant='danger'>{error}</Message> :
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Created</th>
                                <th>Title</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course) => (
                                <tr key={course._id}>
                                    <td>{course._id}</td>
                                    <td>{course.createdAt.substring(0, 10)}</td>
                                    <td>{course.title}</td>
                                    <td>
                                        <LinkContainer to={`/organisation/course/${course._id}`}>
                                            <Button variant='outline-dark' className='btn-sm'>
                                                Details
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
            }

        </>
    );
};

export default CourseCreate;
