import express from 'express';
import {
  createServiceRequest,
  getServiceRequests,
  getServiceRequestById,
  updateServiceRequest,
  deleteServiceRequest,
} from '../controllers/serviceRequestController.js';
import protect from '../middleware/authMiddleware.js';
import { publicFormLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.route('/')
  .post(publicFormLimiter, createServiceRequest)          // Public form submission
  .get(protect, getServiceRequests);    // Protected Admin retrieval

router.route('/:id')
  .get(protect, getServiceRequestById)    // Protected Admin retrieval
  .put(protect, updateServiceRequest)     // Protected Admin update
  .delete(protect, deleteServiceRequest); // Protected Admin deletion

export default router;
