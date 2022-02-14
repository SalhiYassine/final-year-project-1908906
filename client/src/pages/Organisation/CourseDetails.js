import React, { useEffect } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { getOneCourses } from '../../redux/actions/courseAction';

const CourseDetails = ({ match, history }) => {

    const dispatch = useDispatch();
    const { loading, error, success, course } = useSelector((state) => state.courseGetOne);

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
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                <div className='m-auto p-2'>
                    {
                        course && <>
                            <FormContainer>
                                <h1>Course Details</h1>
                                <Form >
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
                                    <Button type='submit' className='my-3' variant='primary'>
                                        Update
                                    </Button>

                                </Form>
                            </FormContainer>
                        </>
                    }

                </div>
            }
        </>
    )
}

export default CourseDetails