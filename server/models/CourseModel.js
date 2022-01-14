import mongoose from 'mongoose';

const CourseSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: false },
        organisation: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Organisation' },
        participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Participant' },]
    },
    { timestamps: true }
);

const Course = mongoose.model('Course', CourseSchema);

export default Course;
