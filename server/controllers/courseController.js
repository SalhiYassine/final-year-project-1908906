import Course from '../models/CourseModel.js';
import Participant from '../models/ParticipantModel.js';
import asyncHandler from 'express-async-handler';

// @desc    create a course
// @route   POST /api/course/
// @access  Private - Organisations only
export const createCourse = asyncHandler(async (req, res) => {

    const { _id } = req.organisation;
    const { title, description } = req.body;
    console.log(_id, title, description)

    const newCourse = await Course.create({ title, description, organisation: _id })
    console.log(newCourse)

    res.json({
        hello: newCourse
    })
});

// @desc    add participant to course
// @route   PUT /api/course/course_id/:participant_id
// @access  Private - Organisations only
export const addParticipantCourse = asyncHandler(async (req, res) => {

    const { _id } = req.organisation;
    const course = await Course.findOne({ organisation: _id, _id: req.params.course_id })
    console.log(course)
    if (course) {
        const participant_id = req.params.participant_id;
        const participant = Participant.findOne({ _id: participant_id })
        if (participant) {
            course.participants.push(participant_id)
            await course.save();

            res.json("Merry Chrismas")

        } else {
            res.json("Santa doesnt like naughty children.")
        }

    } else {
        res.status(404)
        res.json("This course either does not exist or does not belong to your organisation, ensure this course exists!")
    }
});

// @desc    get course details
// @route   GET /api/course/:course_id
// @access  Private - Organisations only
export const getCourseOrganisation = asyncHandler(async (req, res) => {

    const course = await Course.findOne({ _id: req.params.course_id })

    console.log(req.origin)

    if (course) return res.json(course)

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
        console.log(courses)
        res.json(courses)
    } else {
        res.json("failed")
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

// @desc    add participant to course
// @route   PUT /api/course/course_id/:participant_id
// @access  Private - Organisations only
export const removeParticipantCourse = asyncHandler(async (req, res) => {

    const { _id } = req.organisation;
    const courses = await Course.find({ organisation: _id, participants: req.params.participant_id })
    console.log(courses)
    res.json("Merry Xmas")

});