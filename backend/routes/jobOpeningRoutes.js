import express from 'express';
import {
  getJobOpenings,
  getJobOpeningById,
  createJobOpening,
  updateJobOpening,
  deleteJobOpening,
} from '../controllers/jobOpeningController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getJobOpenings)
  .post(protect, createJobOpening);

router.route('/:id')
  .get(getJobOpeningById)
  .put(protect, updateJobOpening)
  .delete(protect, deleteJobOpening);

export default router;
