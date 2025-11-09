import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment',
    required: true,
  },
  rollNo: { type: String, required: true },
  name: { type: String, required: true },
  answer: { type: String, required: true },
  submitted: { type: Boolean, default: true },
  submittedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Submission', submissionSchema);
