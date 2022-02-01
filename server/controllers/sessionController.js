import Course from '../models/CourseModel.js';
import Session from '../models/SessionModel.js';

import asyncHandler from 'express-async-handler';

// @desc    create a session
// @route   POST /api/session/:course-id
// @access  Private - Organisations only
export const createSession = asyncHandler(async (req, res) => {

    const { _id } = req.organisation;
    const course = await Course.findOne({ organisation: _id, _id: req.params.course_id })
    console.log(course)
    if (course) {
        const { title, hybrid, guests } = req.body;
        const newSession = await Session.create({ title, hybrid, guests, course: req.params.course_id })
        res.status(201)
        res.json({
            _id: newSession._id, title: newSession.title
        })
    } else {
        res.status(404)
        res.json("This course either does not exist or does not belong to your organisation, ensure this course exists!")
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
        res.json("Not found.")
    }
});

// @desc    get one session
// @route   get /api/session/:session-id
// @access  Private - Organisations only
export const getOneSession = asyncHandler(async (req, res) => {

    const session = await Session.find({ _id: req.params.session_id })
    if (session) {
        return res.json(session)
    } else {
        res.status(404)
        res.json("Not found.")
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
        res.json("Not found.")
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
        res.json("Not found.")
    }
});