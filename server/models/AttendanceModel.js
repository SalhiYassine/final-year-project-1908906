import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const AttendanceSchema = mongoose.Schema(
    {
        session: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Session' },
        participant: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Participant' },
        date_time: { type: Date, required: false, },
        location: { type: String, required: false, },
        expected: { type: String, required: false, },
    },
    { timestamps: true }
);



const Attendance = mongoose.model('Attendance', AttendanceSchema);

export default Attendance;
