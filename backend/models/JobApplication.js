import mongoose from 'mongoose';

const jobApplicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    jobTitle: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
    },
    resumeUrl: {
      type: String,
      required: [true, 'Resume is required'],
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);
export default JobApplication;
