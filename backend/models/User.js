import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userid: { type: String, required: true, unique: true }, // roll number
  password: { type: String, required: true }
});

export default mongoose.model('User', userSchema);
