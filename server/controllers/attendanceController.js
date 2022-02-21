import asyncHandler from 'express-async-handler';

import Session from '../models/SessionModel.js';
import Participant from '../models/ParticipantModel.js';
import Attendance from '../models/AttendanceModel.js'
import Course from '../models/CourseModel.js';

// @desc    create a record
// @route   POST /api/attendance/online/:session_id
// @access  Private - Users only
export const attendSessionOnlineParticipant = asyncHandler(async (req, res) => {

    const { _id } = req.participant;
    const { session_id } = req.params;

    const duplicate = await Attendance.findOne({ session: session_id, participant: _id })

    if (!duplicate) {

        const exists = await Session.findById(session_id);
        console.log(exists)

        if (exists) {
            const course = await Course.findById(exists.course)
            console.log(course)
            if (course) {
                const expected = course.participants.includes(_id)
                console.log(expected)
                if (!exists.guests && !expected) {

                    res.status(403)
                    return res.json("You are not expected to attend this session and the administrator has not allowed guests.")

                } else {
                    const newRecord = await Attendance.create({
                        session: session_id,
                        participant: _id,
                        date_Time: Date.now(),
                        location: "Online",
                        expected
                    })
                    res.status(200)
                    return res.json({
                        ...newRecord
                    })
                }
            } else {
                res.status(404)
                return res.json("Course does not exist")
            }
        } else {
            res.status(404)
            return res.json("Session does not exist")
        }
    } else {
        res.status(400)
        return res.json("Student attendance already recorded.")
    }
});


export const attendSessionOrganisation = asyncHandler(async (req, res) => {

    const { session_id, participant_id } = req.params;

    const duplicate = await Attendance.findOne({ session: session_id, participant: participant_id })

    if (!duplicate) {

        const exists = await Session.findById(session_id);
        console.log(exists)

        if (exists) {
            const course = await Course.findById(exists.course)
            console.log(course)
            if (course) {
                const expected = course.participants.includes(participant_id)
                console.log(expected)
                if (!exists.guests && !expected) {

                    res.status(403)
                    return res.json("You are not expected to attend this session and the administrator has not allowed guests.")

                } else {
                    const newRecord = await Attendance.create({
                        session: session_id,
                        participant: participant_id,
                        date_time: req.body.date_time || Date.now(),
                        location: req.body.location || "Online",
                        expected
                    })
                    res.status(200)
                    return res.json({
                        ...newRecord
                    })
                }
            } else {
                res.status(404)
                return res.json("Course does not exist")
            }
        } else {
            res.status(404)
            return res.json("Session does not exist")
        }
    } else {
        res.status(400)
        return res.json("Student attendance already recorded.")
    }
});


export const attendenceGetAllParticipant = asyncHandler(async (req, res) => {
    const { _id } = req.participant
    const records = await Attendance.find({ participant: _id })
    const courses = await Course.find({ participants: _id })
    let arr = []
    for (let i = 0; courses.length > i; i++) {
        const sessions = await Session.find({ course: courses[i]._id })
        console.log(sessions)
        for (let j = 0; sessions.length > j; j++) {
            const attended = await Attendance.findOne({ session: sessions[j]._id, participant: _id }).populate({
                path: 'session'
            })
            console.log(attended)
            if (new Date() > sessions[j].end_date) {

                if (attended) {
                    console.log(attended)
                    const { _id, session, participant, location, expected, createdAt, updatedAt } = attended
                    arr.push({
                        session,
                        location,
                        expected,
                        attended: true,
                    })
                } else {
                    arr.push({
                        session: sessions[j],
                        location: 'N/A',
                        expected: true,
                        attended: false,
                    })
                }
            }
        }
    }

    if (arr.length > 0) {
        res.json(arr)
    } else {
        res.json('Records could not be found!')
    }
})

export const attendenceUpdate = asyncHandler(async (req, res) => {

    const { date_time, location, participant } = req.body
    console.log(req.body)
    const s = await Attendance.findOne({ session: req.params.session_id, participant: participant })
    console.log(s)
    if (s) {
        s.date_time = new Date(date_time) || s.date_time;
        s.location = location || s.location;
        await s.save()
        res.json(s)
    } else {
        res.status(404)
        throw new Error('Attendance not found!')
    }


})

export const attendenceDelete = asyncHandler(async (req, res) => {

    const { date_time, location, participant } = req.body
    console.log(req.body)
    const s = await Attendance.findOneAndDelete({ session: req.params.session_id, participant: participant })
    res.json('Deleted!')

})