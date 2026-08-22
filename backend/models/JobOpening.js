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
      enum: [
        'Marketing & Business Development',
        'HR & Administration',
        'Design, Content & Media',
        'Software & IT Development',
        'AI, Data, Cybersecurity & Cloud',
        'Project & Business Operations',
        'Student & Community'
      ],
      default: 'Software & IT Development',
      required: [true, 'Job category is required'],
    },
    location: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

jobOpeningSchema.index({ createdAt: -1 });

const JobOpening = mongoose.model('JobOpening', jobOpeningSchema);
export default JobOpening;
