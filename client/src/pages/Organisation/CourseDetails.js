import React, { useEffect, useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { getOneCourses, addParticipantCourse, removeParticipantCourse } from '../../redux/actions/courseAction';
import { deleteOneSession } from '../../redux/actions/sessionAction';

const CourseDetails = ({ match, history }) => {

    const dispatch = useDispatch();
    const { loading, error, success, course, sessions } = useSelector((state) => state.courseGetOne);
    const { loading: addParticipantLoading, error: addParticipantError, success: addParticipantSuccess } = useSelector((state) => state.courseAddParticipant);
    const { loading: removeParticipantLoading, error: removeParticipantError, success: removeParticipantSuccess } = useSelector((state) => state.courseRemoveParticipant);

    const [participantEmail, setParticipantEmail] = useState()

    useEffect(() => {
        const id = match.params.id;
        dispatch(getOneCourses(id))

    }, [addParticipantSuccess, removeParticipantSuccess])

    const onSubmitAddParticipant = (e) => {

        e.preventDefault()
        if (!addParticipantLoading) {
            dispatch(addParticipantCourse(match.params.id, participantEmail))
            setParticipantEmail('')
        }
    }

    const onDeleteParticipant = (email) => {

        const id = match.params.id;
        dispatch(removeParticipantCourse(id, email))
        dispatch(getOneCourses(id))


    }

    const onDeleteSession = (session_id) => {

        const id = match.params.id;
        dispatch(deleteOneSession(session_id))
        dispatch(getOneCourses(id))


    }




    return (
        <>
            <LinkContainer to={`/`} as='div'>
                <Button type='submit' className='my-3' variant='light'>
                    GO BACK
                </Button>
            </LinkContainer>
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
                                <Form className='d-flex my-3 align-items-center' onSubmit={(e) => onSubmitAddParticipant(e)} inline>
                                    <h2>Partcipants</h2>
                                    <Form.Control
                                        type='text'
                                        placeholder='Add a participant'
                                        value={participantEmail}
                                        disabled={addParticipantLoading}
                                        onChange={(e) => setParticipantEmail(e.target.value)}
                                        className='me-sm-2 ms-sm-5 py-3'></Form.Control>
                                    <Button disabled={addParticipantLoading} type='submit' variant='outline-success' className='px-5'>
                                        ADD
                                    </Button>
                                </Form>
                                {addParticipantError && <Message variant='danger'>{addParticipantError}</Message>}
                                {course.participants &&
                                    <Table striped bordered hover responsive className='table-sm w-100 py-3'>
                                        <thead>
                                            <tr>
                                                {/* <th>ID</th> */}
                                                <th>Name</th>
                                                <th>Surname</th>
                                                <th>Email</th>
                                                <th>Signed Up</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {course.participants.map((participant) => (
                                                <>
                                                    <tr key={participant._id}>
                                                        {/* <td>{participant._id}</td> */}
                                                        <td>{participant.name}</td>
                                                        <td>{participant.surname}</td>
                                                        <td>{participant.email}</td>
                                                        <td>{participant.createdAt.substring(0, 10)}</td>
                                                        <td>
                                                            <Button
                                                                type='submit'
                                                                className='my-3'
                                                                variant='danger'
                                                                onClick={() => onDeleteParticipant(participant.email)}
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
                                    <LinkContainer to={`/course/${match.params.id}/session/create`} as='div'>

                                        <Button type='submit' className='m-3 ' variant='success'>
                                            ADD Session
                                        </Button>
                                    </LinkContainer>
                                </h2>
                                {sessions &&

                                    <Table striped bordered hover responsive className='table-sm w-100 py-3'>

                                        <thead>
                                            <tr>
                                                {/* <th>ID</th> */}
                                                <th>Title</th>
                                                <th>Guests</th>
                                                <th>Hybrid</th>
                                                <th>Created</th>
                                                <th>Updated</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sessions.map((session) => (
                                                <>
                                                    <tr key={session._id}>
                                                        {/* <td>{session._id}</td> */}
                                                        <td>{session.title}</td>
                                                        <td>{session.guests.toString()}</td>
                                                        <td>{session.hybrid.toString()}</td>
                                                        <td>{session.createdAt.substring(0, 10)}</td>
                                                        <td>{session.updatedAt.substring(0, 10)}</td>
                                                        <td>
                                                            <LinkContainer to={`/session/${session._id}`} as='div'>
                                                                <Button
                                                                    type='submit'
                                                                    className=''
                                                                    variant='dark'
                                                                >
                                                                    View
                                                                </Button>
                                                            </LinkContainer>
                                                            <Button
                                                                type='submit'
                                                                className='my-3'
                                                                variant='danger'
                                                                onClick={() => onDeleteSession(session._id)}
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