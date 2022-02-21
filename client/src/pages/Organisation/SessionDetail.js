import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, Modal, Form } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { getOneSession } from '../../redux/actions/sessionAction'
import { createAttendanceOrg, deleteRecord, updateRecord } from '../../redux/actions/attendanceAction'

import Loader from '../../components/Loader';
import Message from '../../components/Message';

const SessionDetail = ({ history, match }) => {
    const dispatch = useDispatch();
    const { loading, error, success, session, attendance } = useSelector((state) => state.sessionGetOne);
    const [lgShow, setLgShow] = useState(false);
    const [modalUser, setModalUser] = useState();
    const [hybrid, setHybrid] = useState('Online');
    const [date, setDate] = useState(new Date());



    const interactModal = (user) => {
        setModalUser(user)

        setLgShow(!lgShow)
    }

    const onCreateRecordHandler = (session_id, user_id, record) => {
        dispatch(createAttendanceOrg(session_id, user_id, record))

    }

    const onEditRecordHandler = (session_id, user_id) => {
        dispatch(updateRecord(session_id, { location: hybrid, date_time: date, participant: user_id }))

    }

    const onDeleteRecordHandler = (session_id, user_id) => {
        dispatch(deleteRecord(session_id, { location: hybrid, date_time: date, participant: user_id }))

    }


    useEffect(() => {
        dispatch(getOneSession(match.params.id))

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
                                            <td>
                                                {
                                                    att.attended ?
                                                        <div className='d-flex'>
                                                            <Button onClick={() => interactModal(att)} type='submit' className='' variant='dark'>
                                                                Alter
                                                            </Button>
                                                            <Button onClick={() => onDeleteRecordHandler(session._id, att._id)} type='button' className='' variant='danger'>
                                                                Remove
                                                            </Button>
                                                        </div>
                                                        : <>
                                                            <Button onClick={() => interactModal(att)} type='submit' className='' variant='success'>
                                                                ADD
                                                            </Button>
                                                        </>
                                                }
                                            </td>
                                        </tr>
                                    </>
                                ))}
                            </tbody>

                        </Table>

                    }
                </div>
            }
            <>
                {modalUser &&
                    <Modal
                        size="lg"
                        show={lgShow}
                        onHide={() => setLgShow(false)}
                        aria-labelledby="example-modal-sizes-title-lg"
                    >
                        <Modal.Header closeButton>
                            {modalUser.attended ?
                                <Modal.Title id="example-modal-sizes-title-lg">
                                    Edit Record
                                </Modal.Title> :
                                <Modal.Title id="example-modal-sizes-title-lg">
                                    Create Record
                                </Modal.Title>
                            }
                        </Modal.Header>
                        {modalUser.attended ?
                            <Modal.Body>
                                <Form>
                                    <Form.Group controlId='title'>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            className='mb-3'
                                            type='text'
                                            disabled
                                            placeholder='Enter title'
                                            value={modalUser.email}
                                        />

                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            className='mb-3'
                                            type='text'
                                            disabled
                                            placeholder='Enter title'
                                            value={modalUser.name}
                                        />

                                        <Form.Label>Surname</Form.Label>
                                        <Form.Control
                                            className='mb-3'
                                            type='text'
                                            disabled
                                            placeholder='Enter title'
                                            value={modalUser.surname}
                                        />

                                        <Form.Group controlId='hybrid' className='my-3'>
                                            <Form.Label>Attendance</Form.Label>
                                            <select className="form-select" onChange={(e) => setHybrid(e.target.value)} value={hybrid} id="Select">

                                                {(session.hybrid === 'Hybrid' || session.hybrid === 'Online') &&
                                                    <option>Online</option>

                                                }
                                                {(session.hybrid === 'Hybrid' || session.hybrid === 'In-Person') &&
                                                    <option>In-Person</option>

                                                }
                                            </select>
                                        </Form.Group>

                                        <Form.Label>Attendence Date and Time</Form.Label>
                                        <DatePicker
                                            className='form-control mb-3'
                                            timeInputLabel="Time:"
                                            dateFormat="dd/MM/yyyy h:mm aa"
                                            selected={new Date()}
                                            onChange={(d) => setDate(d)}
                                            showTimeSelect
                                        />
                                    </Form.Group>
                                    <Button type='button' onClick={() => onEditRecordHandler(session._id, modalUser._id)} className='W-100' size='xl' variant='dark'>
                                        SUBMIT
                                    </Button>
                                </Form>
                            </Modal.Body> :
                            <Modal.Body>
                                <Form>
                                    <Form.Group controlId='title'>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            className='mb-3'
                                            type='text'
                                            disabled
                                            placeholder='Enter title'
                                            value={modalUser.email}
                                        />

                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            className='mb-3'
                                            type='text'
                                            disabled
                                            placeholder='Enter title'
                                            value={modalUser.name}
                                        />

                                        <Form.Label>Surname</Form.Label>
                                        <Form.Control
                                            className='mb-3'
                                            type='text'
                                            disabled
                                            placeholder='Enter title'
                                            value={modalUser.surname}
                                        />

                                        <Form.Group controlId='hybrid' className='my-3'>
                                            <Form.Label>Attendance</Form.Label>
                                            <select className="form-select" onChange={(e) => setHybrid(e.target.value)} value={hybrid} id="Select">

                                                {(session.hybrid === 'Hybrid' || session.hybrid === 'Online') &&
                                                    <option>Online</option>

                                                }
                                                {(session.hybrid === 'Hybrid' || session.hybrid === 'In-Person') &&
                                                    <option>In-Person</option>

                                                }
                                            </select>
                                        </Form.Group>

                                        <Form.Label>Attendence Date and Time</Form.Label>
                                        <DatePicker
                                            className='form-control mb-3'
                                            timeInputLabel="Time:"
                                            dateFormat="dd/MM/yyyy h:mm aa"
                                            showTimeSelect
                                            selected={date}
                                            onChange={(date) => setDate(date)}


                                        />
                                    </Form.Group>
                                    <Button type='button' onClick={() => onCreateRecordHandler(session._id, modalUser._id, { location: hybrid, date_time: date, expected: true })} className='W-100' size='xl' variant='dark'>
                                        SUBMIT
                                    </Button>
                                </Form>
                            </Modal.Body>
                        }
                    </Modal>
                }
            </>

        </>
    )
}

export default SessionDetail