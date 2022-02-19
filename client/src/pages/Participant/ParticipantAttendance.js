import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as fa from 'react-icons/fa';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { Button } from 'react-bootstrap';
import { getParticipantRecord } from '../../redux/actions/attendanceAction';


const ParticipantAttendance = () => {
    const dispatch = useDispatch();
    const { loading, error, success, records } = useSelector((state) => state.attendanceGetParticipant);


    useEffect(() => {
        dispatch(getParticipantRecord())

    }, [])

    return (
        <div className=''>
            {loading ? <Loader /> : error ? <Message>{error}</Message> : records ?
                <>
                    <VerticalTimeline lineColor='grey'>
                        {records.map((r) => (
                            <>
                                <VerticalTimelineElement
                                    className="vertical-timeline-element--education"
                                    contentStyle={r.attended ? { background: 'rgb(250, 250, 250)', color: 'black', borderTop: '2px solid rgb(0, 98, 72)' } : { background: 'rgb(250, 250, 250)', color: 'black', borderTop: 'solid 2px rgb(250, 0, 0)' }}
                                    contentArrowStyle={{ borderRight: '7px solid  rgb(250, 250, 250)' }}
                                    date={r.attended ? `Attended : ${r.session.start_date.split('T')[0]}` : `Missed :  ${r.session.start_date.split('T')[0]}`}
                                    iconStyle={r.attended ? { background: 'rgb(0, 98, 72)', color: 'white' } : { background: 'rgb(255, 30, 30)', color: 'white' }}
                                    animate
                                    icon={!r.attended ? <fa.FaCalendarCheck /> : <fa.FaCalendarDay />}
                                >
                                    <div className='d-flex'>
                                        <p>{(r.session.start_date.split('T')[1]).split('.')[0].split(':')[0]}:{(r.session.start_date.split('T')[1]).split('.')[0].split(':')[1]} </p>
                                        <p>{'-'}</p>
                                        <p> {(r.session.end_date.split('T')[1]).split('.')[0].split(':')[0]}:{(r.session.end_date.split('T')[1]).split('.')[0].split(':')[1]}</p>
                                    </div>
                                    <h4 className="vertical-timeline-element-title">{r.session.title}</h4>
                                    <h6 className="vertical-timeline-element-subtitle">{r.session.hybrid}</h6>



                                </VerticalTimelineElement>
                            </>
                        ))}
                    </VerticalTimeline>
                </>
                : <Loader />
            }

        </div >
    )
}

export default ParticipantAttendance