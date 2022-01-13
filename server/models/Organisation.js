import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const OrganisationSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

OrganisationSchema.methods.matchPassword = async function (reqPassword) {
  return await bcrypt.compare(reqPassword, this.password);
};

OrganisationSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Organisation = mongoose.model('Organisation', OrganisationSchema);

export default Organisation;
