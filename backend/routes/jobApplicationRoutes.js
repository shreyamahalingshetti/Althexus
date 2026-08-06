import express from 'express';
import {
  createJobApplication,
  getJobApplications,
  getJobApplicationById,
  deleteJobApplication,
} from '../controllers/jobApplicationController.js';
import protect from '../middleware/authMiddleware.js';
import { uploadResume } from '../middleware/uploadResume.js';

const router = express.Router();

router.route('/')
  .post(uploadResume, createJobApplication)
  .get(protect, getJobApplications);

router.route('/:id')
  .get(protect, getJobApplicationById)
  .delete(protect, deleteJobApplication);

export default router;
