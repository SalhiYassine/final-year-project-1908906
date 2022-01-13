import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const participantSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

participantSchema.methods.matchPassword = async function (reqPassword) {
  return await bcrypt.compare(reqPassword, this.password);
};

participantSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Participant = mongoose.model('Participant', participantSchema);

export default Participant;
