import Course from '../models/CourseModel.js';
import Session from '../models/SessionModel.js';

import asyncHandler from 'express-async-handler';
import Attendance from '../models/AttendanceModel.js';

// @desc    create a session
// @route   POST /api/session/:course-id
// @access  Private - Organisations only
export const createSession = asyncHandler(async (req, res) => {

    const { _id } = req.organisation;
    const course = await Course.findOne({ organisation: _id, _id: req.params.course_id })
    console.log(course)
    if (course) {
        const { title, hybrid, guests, startDate, endDate, url, location } = req.body;
        const newSession = await Session.create({ title, hybrid, guests, course: req.params.course_id, url, start_date: startDate, end_date: endDate, location })
        res.status(201)
        res.json({
            _id: newSession._id, title: newSession.title
        })
    } else {
        res.status(404)
        throw new Error("This course either does not exist or does not belong to your organisation, ensure this course exists!")
    }



    // const newCourse = await Course.create({ title, description, organisation: _id })
    // console.log(coursesByOrganisation)

    // res.json({
    //     hello: coursesByOrganisation
    // })
});

// @desc    get sessions from a course
// @route   get /api/session/course/:course-id
// @access  Private - Organisations only
export const getAllSessions = asyncHandler(async (req, res) => {

    const sessions = await Session.find({ course: req.params.course_id })
    if (sessions) {
        return res.json(sessions)
    } else {
        res.status(404)
        throw new Error("Session not found.")
    }
});

// @desc    get one session
// @route   get /api/session/:session-id
// @access  Private - Organisations only
export const getOneSession = asyncHandler(async (req, res) => {

    const session = await Session.findOne({ _id: req.params.session_id })
    if (session) {
        const attendence = await Attendance.find({ session: req.params.session_id }).populate({
            path: 'participant',
            select: '_id name surname email username'
        })
        console.log(attendence)
        const { participants } = await Course.findOne({ _id: session.course }).populate({
            path: 'participants',
            select: '_id name surname email username'
        })

        const attendees = () => {
            const roster = []
            attendence.map((record) => {
                const new_record = {
                    _id: record.participant._id,
                    name: record.participant.name,
                    surname: record.participant.surname,
                    username: record.participant.username,
                    email: record.participant.email,
                    expected: record.participant.expected,
                    attended: true,
                    attendedAt: record.dateTime || 'unknown',
                    location: record.location || 'unknown'
                }
                roster.push(new_record)
            })
            participants.map((participant) => {

                const exists = () => {
                    const isThere = attendence.find(
                        (r) => r.participant._id.toString() === participant._id.toString()
                    )
                    if (isThere) {
                        return true
                    } else return false
                }

                if (!exists()) {
                    const new_record = {
                        _id: participant._id,
                        name: participant.name,
                        surname: participant.surname,
                        username: participant.username,
                        email: participant.email,
                        expected: true,
                        attended: false,
                        attendedAt: false,
                        location: false
                    }
                    roster.push(new_record)
                }
            })
            console.log(roster)
            return roster
        }
        return res.json({ session, attendence: attendees() })

    } else {
        res.status(404)
        throw new Error("Session not found.")
    }
});

// @desc    get one session
// @route   get /api/session/:session-id
// @access  Private - Organisations only
export const updateOneSession = asyncHandler(async (req, res) => {
    const { title, hybrid, guests } = req.body;
    const session = await Session.findOne({ _id: req.params.session_id })
    if (session) {
        session.title = title || session.title;
        session.hybrid = hybrid || session.hybrid;
        session.guests = guests || session.guests;
        await session.save()
        return res.json(session)
    } else {
        res.status(404)
        throw new Error("Not found.")
    }
});

// @desc    DELETE one session
// @route   DELETE /api/session/:session-id
// @access  Private - Organisations only
export const deleteOneSession = asyncHandler(async (req, res) => {
    const session = await Session.findOne({ _id: req.params.session_id })
    if (session) {
        const deleted = await Session.deleteOne({ _id: req.params.session_id })
        return res.json(deleted)
    } else {
        res.status(404)
        throw new Error("Not found.")
    }
});