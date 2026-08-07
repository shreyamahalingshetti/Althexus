import mongoose from 'mongoose';

const jobOpeningSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['Job', 'Internship'],
      required: [true, 'Job type is required'],
    },
    category: {
      type: String,
      enum: ['IT', 'Non IT'],
      default: 'IT',
      required: [true, 'Job category (IT or Non IT) is required'],
    },
    location: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Job description is required'],
    },
  },
  {
    timestamps: true,
  }
);

const JobOpening = mongoose.model('JobOpening', jobOpeningSchema);
export default JobOpening;
