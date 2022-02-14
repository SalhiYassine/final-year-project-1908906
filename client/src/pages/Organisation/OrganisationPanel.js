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
        if (!success && !error && !loading) {
            dispatch(getAllCourses());
        }
    }, [success, error])





    return (
        <>
            {loading ? <Loader /> :
                error ? <Message variant='danger'>{error}</Message> : courses ?
                    <>
                        <div className='w-75 m-auto'>
                            <h1>Courses</h1>
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Created</th>
                                        <th>Title</th>
                                        <th>Participants</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courses.map((course) => (
                                        <tr key={course._id}>
                                            <td>{course._id}</td>
                                            <td>{course.createdAt.substring(0, 10)}</td>
                                            <td>{course.title}</td>
                                            <td>{course.participants.length}</td>
                                            <td>
                                                <LinkContainer to={`/course/${course._id}`}>
                                                    <Button variant='outline-dark' className='btn-sm'>
                                                        Details
                                                    </Button>
                                                </LinkContainer>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </> : <h2>No Courses Available</h2>
            }

        </>
    );
};

export default CourseCreate;
