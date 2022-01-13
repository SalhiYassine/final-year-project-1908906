import Course from '../models/CourseModel.js';
import asyncHandler from 'express-async-handler';

// @desc    create a course
// @route   POST /api/course/
// @access  Private - Organisations only
export const createCourse = asyncHandler(async (req, res) => {
    res.json({
        hello: "hello"
    })
});