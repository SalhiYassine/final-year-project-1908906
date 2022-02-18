import Course from '../models/CourseModel.js';
import Session from '../models/SessionModel.js';
import Participant from '../models/ParticipantModel.js';
import asyncHandler from 'express-async-handler';
import e from 'express';

// @desc    create a course
// @route   POST /api/course/
// @access  Private - Organisations only
export const createCourse = asyncHandler(async (req, res) => {

    const course = await Course.create({ title: req.body.title, description: req.body.description, organisation: req.organisation._id })
    res.status(201)
    return res.json(course)
});

// @desc    get all course
// @route   GET /api/course/
// @access  Private - Organisations only
export const getAllCourses = asyncHandler(async (req, res) => {

    const courses = await Course.find({ organisation: req.organisation._id })
    if (courses) {

        res.status(201)
        return res.json(courses)
    } else {
        res.status(404)
        return res.json("No courses found")
    }
});


// @desc    add participant to course
// @route   PUT /api/course/course_id/:participant_id
// @access  Private - Organisations only
export const addParticipantCourse = asyncHandler(async (req, res) => {

    const { _id } = req.organisation;
    const course = await Course.findOne({ organisation: _id, _id: req.params.course_id })
    console.log(course)
    if (course) {
        const participant = await Participant.findOne({ email: req.body.email })
        console.log(participant)
        if (participant) {
            const exists = course.participants.find(
                (r) => r.toString() === participant._id.toString()
            );
            if (!exists) {
                course.participants.push(participant._id)
                await course.save();
                res.json("Participant added to course!")
            } else {
                res.status(401)
                throw new Error('User already in course.')
            }


        } else {
            res.status(401)
            throw new Error("Not authorised to perform action.")
        }

    } else {
        res.status(404)
        throw new Error("This course either does not exist or does not belong to your organisation, ensure this course exists!")
    }
});

// @desc    get course details
// @route   GET /api/course/:course_id
// @access  Private - Organisations only
export const getCourseOrganisation = asyncHandler(async (req, res) => {

    const course = await Course.findOne({ _id: req.params.course_id }).populate({
        path: 'participants',
        select: '_id name surname email username createdAt updatedAt'

    })
    const sessions = await Session.find({ course: req.params.course_id })

    console.log(req.origin)

    if (course) {
        if (sessions) {
            return res.json({ course, sessions })
        } else {
            return res.json(course)
        }
    }

    res.status(404)
    return res.json("Course ID invalid.")

})


// @desc    PUT course details
// @route   PUT /api/course/:course_id
// @access  Private - Organisations only
export const updateCourseOrganisation = asyncHandler(async (req, res) => {

    const course = await Course.findOne({ _id: req.params.course_id })
    const { title, description } = course;

    console.log(req.origin)

    if (course) {
        course.title = req.body.title || title;
        course.description = req.body.description || description;
        await course.save();

        return res.json(course)
    }

    res.status(404)
    return res.json("Course ID invalid.")

})

// @desc    DELETE course details
// @route   DELETE /api/course/:course_id
// @access  Private - Organisations only
export const deleteCourseOrganisation = asyncHandler(async (req, res) => {

    const course = await Course.findOne({ _id: req.params.course_id })

    if (course) {
        const deleted = await Course.deleteOne({ _id: req.params.course_id })
        return res.json(deleted)
    }

    res.status(404)
    return res.json("Course ID invalid.")

})


// @desc    return the courses a participant is registered to
// @route   GET /api/course/participant
// @access  Private - Participant only
export const findParticipantCourse = asyncHandler(async (req, res) => {

    const { _id } = req.participant;
    const courses = await Course.find({ participants: _id })
    if (courses) {
        let arr = []
        for (let i = 0; courses.length > i; i++) {
            const c = courses[i]
            const sessions = await Session.find({ course: c._id })
            for (let j = 0; sessions.length > j; j++) {
                arr.push(sessions[j])
            }
        }
        console.log(arr)
        res.json(arr)
    } else {
        res.status(404)
        throw new Error('Course could not be found!')
    }

});

// @desc    return the courses an organisation runs
// @route   GET /api/course/organisation
// @access  Private - Organisations only
export const findOrganisationCourse = asyncHandler(async (req, res) => {

    const { _id } = req.organisation;
    const courses = await Course.find({ organisation: _id })
    if (courses) {
        console.log(courses)
        res.json(courses)
    } else {
        res.json("failed")
    }
});


export const removeParticipantCourse = asyncHandler(async (req, res) => {

    const { _id } = req.organisation;
    const course = await Course.findOne({ organisation: _id, _id: req.params.course_id })
    if (course) {
        console.log(req.body)
        const participant = await Participant.findOne({ email: req.body.email })
        console.log(participant)
        if (participant) {
            const exists = course.participants.find(
                (r) => r.toString() === participant._id.toString()
            );
            if (exists) {
                course.participants = course.participants.filter(function (p) {
                    console.log(p.toString() === participant._id.toString())
                    return p.toString() !== participant._id.toString();
                })
                await course.save();
                res.json("Participant removed from course!")
            } else {
                res.status(401)
                throw new Error('User is not in course.')
            }
        } else {
            res.status(401)
            throw new Error("Participant does not exist!")
        }

    } else {
        res.status(404)
        throw new Error('Course could not be found or does not belong to your organisation!')
    }


});