import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  dueDate: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Add a status if you want to track assignment as a whole
  status: {
    type: String,
    default: 'Active', // or '' if you don't want a default
  }
});

export default mongoose.model('Assignment', assignmentSchema);
