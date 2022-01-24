import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const SessionSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        course: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Course' },
        // start_Time: { type: Date, required: true },
        // end_Time: { type: Date, required: true },
        hybrid: { type: Boolean, required: true },
        guests: { type: Boolean, required: true },
        location: { type: String },
        url: { type: String },

    },
    { timestamps: true }
);



const Session = mongoose.model('Session', SessionSchema);

export default Session;

