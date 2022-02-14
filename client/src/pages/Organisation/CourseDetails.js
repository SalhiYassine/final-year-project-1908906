import React, { useEffect } from 'react'
import { Button, Form, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { getOneCourses } from '../../redux/actions/courseAction';

const CourseDetails = ({ match, history }) => {

    const dispatch = useDispatch();
    const { loading, error, success, course, sessions } = useSelector((state) => state.courseGetOne);

    useEffect(() => {
        const id = match.params.id;
        if (!error && !success) {
            dispatch(getOneCourses(id))
        } else if (id !== course._id) {
            dispatch(getOneCourses(id))
        }
    }, [error, success, match, dispatch])


    return (
        <>
            <Button type='submit' className='my-3' variant='light'>
                GO BACK
            </Button>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                <div className='m-auto p-2 w-100'>
                    {
                        course && <>
                            <div className='mx-auto'>
                                <h1>Course Details</h1>
                                <Form className='w-100 py-3'>
                                    <Form.Group controlId='id'>
                                        <Form.Label>ID</Form.Label>
                                        <Form.Control
                                            type='text'
                                            disabled
                                            value={course._id}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId='date' className='my-3'>
                                        <Form.Label>Created</Form.Label>
                                        <Form.Control
                                            type='text'
                                            disabled
                                            value={course.createdAt.substring(0, 10)}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId='date' className='my-3'>
                                        <Form.Label>Updated</Form.Label>
                                        <Form.Control
                                            type='text'
                                            disabled
                                            value={course.updatedAt.substring(0, 10)}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId='title'>
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter title'
                                            value={course.title}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId='description' className='my-3'>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter description'
                                            value={course.description}
                                        />
                                    </Form.Group>
                                    <Button type='submit' className='my-3 ' variant='primary'>
                                        Update
                                    </Button>

                                </Form>
                                <h2>Partcipants
                                    <Button type='submit' className='m-3 ' variant='success'>
                                        ADD Participant
                                    </Button></h2>
                                {course.participants &&

                                    <Table striped bordered hover responsive className='table-sm w-100 py-3'>

                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Signed Up</th>
                                                <th>Name</th>
                                                <th>Surname</th>
                                                <th>Email</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {course.participants.map((participant) => (
                                                <>
                                                    <tr key={participant._id}>
                                                        <td>{participant._id}</td>
                                                        <td>{participant.createdAt.substring(0, 10)}</td>
                                                        <td>{participant.name}</td>
                                                        <td>{participant.surname}</td>
                                                        <td>{participant.email}</td>
                                                        <td>
                                                            <Button
                                                                type='submit'
                                                                className='my-3'
                                                                variant='danger'
                                                            >
                                                                Remove
                                                            </Button>
                                                        </td>
                                                    </tr>

                                                </>
                                            ))}
                                        </tbody>
                                    </Table>
                                }

                                <h2>Sessions
                                    <Button type='submit' className='m-3 ' variant='success'>
                                        ADD Session
                                    </Button></h2>
                                {sessions &&

                                    <Table striped bordered hover responsive className='table-sm w-100 py-3'>

                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Created</th>
                                                <th>Updated</th>
                                                <th>Title</th>
                                                <th>Hybrid</th>
                                                <th>Guests</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sessions.map((session) => (
                                                <>
                                                    <tr key={session._id}>
                                                        <td>{session._id}</td>
                                                        <td>{session.createdAt.substring(0, 10)}</td>
                                                        <td>{session.updatedAt.substring(0, 10)}</td>
                                                        <td>{session.title}</td>
                                                        <td>{session.hybrid.toString()}</td>
                                                        <td>{session.guests.toString()}</td>
                                                        <td>
                                                            <Button
                                                                type='submit'
                                                                className='my-3'
                                                                variant='primary'
                                                            >
                                                                View
                                                            </Button>
                                                            <Button
                                                                type='submit'
                                                                className='my-3'
                                                                variant='danger'
                                                            >
                                                                Remove
                                                            </Button>
                                                        </td>
                                                    </tr>

                                                </>
                                            ))}
                                        </tbody>
                                    </Table>
                                }
                            </div>
                        </>
                    }

                </div>
            }
        </>
    )
}

export default CourseDetails