import express from 'express';
import {
  createJobApplication,
  getJobApplications,
  getJobApplicationById,
  deleteJobApplication,
} from '../controllers/jobApplicationController.js';
import protect from '../middleware/authMiddleware.js';
import { uploadResume } from '../middleware/uploadResume.js';
import { publicFormLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.route('/')
  .post(publicFormLimiter, uploadResume, createJobApplication)
  .get(protect, getJobApplications);

router.route('/:id')
  .get(protect, getJobApplicationById)
  .delete(protect, deleteJobApplication);

export default router;
