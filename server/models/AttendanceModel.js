import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const AttendanceSchema = mongoose.Schema(
    {
        session: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Session' },
        participant: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Participant' },
        date_Time: { type: Date, required: true, },
        location: { type: String, required: true, },
        expected: { type: String, required: true, },
    },
    { timestamps: true }
);



const Attendance = mongoose.model('Attendance', AttendanceSchema);

export default Attendance;
