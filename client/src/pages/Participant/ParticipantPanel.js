import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as fa from 'react-icons/fa';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { getParticipantSessions } from '../../redux/actions/sessionAction'
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { Button } from 'react-bootstrap';
import { getParticipantRecord } from '../../redux/actions/attendanceAction';


const ParticipantPanel = () => {
    const dispatch = useDispatch();
    const { loading, error, success, sessions } = useSelector((state) => state.sessionGetParticipant);

    const canBeAttended = (start, end) => {
        if ((Date.parse(start) - Date.parse(new Date())) > 0 || (Date.parse(end) - Date.parse(new Date())) < 0) {
            return true
        } return false
    }
    useEffect(() => {
        dispatch(getParticipantSessions())
        dispatch(getParticipantRecord())

    }, [])

    return (
        <div className=''>
            {loading ? <Loader /> : error ? <Message>{error}</Message> : sessions ?

                <VerticalTimeline lineColor='grey'>
                    {sessions.map(s => (
                        <>
                            <VerticalTimelineElement
                                className="vertical-timeline-element--education"
                                contentStyle={!canBeAttended(s.start_date, s.end_date) ? { background: 'rgb(250, 250, 250)', color: 'black', borderTop: '2px solid rgb(0, 98, 72)' } : { background: 'rgb(250, 250, 250)', color: 'black', borderTop: 'solid 2px rgb(0, 59, 198)' }}
                                contentArrowStyle={{ borderRight: '7px solid  rgb(250, 250, 250)' }}
                                date={canBeAttended(s.start_date, s.end_date) ? `${s.start_date.split('T')[0]}` : `In-Progress`}
                                iconStyle={!canBeAttended(s.start_date, s.end_date) ? { background: 'rgb(0, 98, 72)', color: 'white' } : { background: 'rgb(0, 59, 198)', color: 'white' }}
                                animate
                                icon={!canBeAttended(s.start_date, s.end_date) ? <fa.FaCalendarCheck /> : <fa.FaCalendarDay />}
                            >
                                <h4 className="vertical-timeline-element-title">{s.title}</h4>
                                <h6 className="vertical-timeline-element-subtitle">{s.hybrid}</h6>
                                <div className='d-flex'>
                                    <p>{(s.start_date.split('T')[1]).split('.')[0].split(':')[0]}:{(s.start_date.split('T')[1]).split('.')[0].split(':')[1]} </p>
                                    <p>{'-'}</p>
                                    <p> {(s.end_date.split('T')[1]).split('.')[0].split(':')[0]}:{(s.end_date.split('T')[1]).split('.')[0].split(':')[1]}</p>
                                </div>

                                {(s.hybrid === 'Online' || s.hybrid === 'Hybrid') &&
                                    <Button style={!canBeAttended(s.start_date, s.end_date) ? { backgroundColor: 'rgb(0, 98, 72)' } : {}} disabled={canBeAttended(s.start_date, s.end_date)} variant={!canBeAttended(s.start_date, s.end_date) ? `info` : `outline-dark`} >Attend</Button>

                                }
                            </VerticalTimelineElement>

                        </>
                    ))}
                </VerticalTimeline>
                : <Loader />
            }

        </div >
    )
}

export default ParticipantPanel