import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import { getOneSession } from '../../redux/actions/sessionAction'
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const SessionDetail = ({ history, match }) => {
    const dispatch = useDispatch();
    const { loading, error, success, session, attendance } = useSelector((state) => state.sessionGetOne);


    useEffect(() => {

        dispatch(getOneSession(match.params.id))

        return () => {

        }
    }, [])



    return (
        <>
            <LinkContainer to={session ? `/course/${session.course}` : `/`} as='div'>
                <Button type='submit' className='my-3' variant='light'>
                    GO BACK
                </Button>
            </LinkContainer>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                <div className='m-auto p-2 w-100'>
                    <h1 className='my-3'>Session Details</h1>
                    {session &&
                        <Table striped bordered hover responsive className='table-sm w-100 my-3 py-3'>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Mode</th>
                                    <th>Guests</th>
                                    {(session.hybrid === 'Online' || session.hybrid === 'Hybrid') &&
                                        <th>URL</th>
                                    }
                                    {(session.hybrid === 'In-Person' || session.hybrid === 'Hybrid') &&
                                        <th>Location</th>
                                    }
                                    <th>Start Time </th>
                                    <th>End Time </th>
                                    <th>Actions </th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr key={session}>
                                    <td>{session.title}</td>
                                    <td>{session.hybrid}</td>
                                    <td>{session.guests.toString()}</td>
                                    {(session.hybrid === 'Online' || session.hybrid === 'Hybrid') &&
                                        <td>{session.url}</td>
                                    }
                                    {(session.hybrid === 'In-Person' || session.hybrid === 'Hybrid') &&
                                        <td>{session.location}</td>
                                    }
                                    <td>{session.start_date.split('T')[0]} : {(session.start_date.split('T')[1]).split('.')[0]}</td>
                                    <td>{session.end_date.split('T')[0]} : {(session.end_date.split('T')[1]).split('.')[0]}</td>
                                    <td><LinkContainer to={`/session/${match.params.id}/update`} as='div'>
                                        <Button type='submit' className='m-3 ' variant='dark'>
                                            Update
                                        </Button>
                                    </LinkContainer></td>
                                </tr>
                            </tbody>

                        </Table>

                    }

                    <h1 className='my-3'>Attendence Details</h1>

                    {attendance &&
                        <Table striped bordered hover responsive className='table-sm w-100 my-3 py-3'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Surname</th>
                                    <th>Email</th>
                                    <th>Attended</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendance.map((att) => (
                                    <>
                                        <tr key={att._id}>
                                            <td>{att.name}</td>
                                            <td>{att.surname}</td>
                                            <td>{att.email}</td>
                                            <td className={att.attended ? 'text-success' : 'text-danger'}>{att.attended ? `${att.location.toUpperCase()}` : 'NOT ATTENDED'}</td>
                                            <td><LinkContainer to={`/session/${match.params.id}/update`} as='div'>
                                                <Button type='submit' className='m-3 ' variant='outline-dark'>
                                                    ALTER
                                                </Button>
                                            </LinkContainer></td>
                                        </tr>
                                    </>
                                ))}
                            </tbody>

                        </Table>

                    }
                </div>
            }


        </>
    )
}

export default SessionDetail