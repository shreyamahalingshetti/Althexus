import express from 'express';
import {
  createContact,
  getContacts,
  getContactById,
  deleteContact,
} from '../controllers/contactController.js';
import protect from '../middleware/authMiddleware.js';
import { publicFormLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.route('/')
  .post(publicFormLimiter, createContact)          // Public form submission
  .get(protect, getContacts);    // Protected Admin retrieval

router.route('/:id')
  .get(protect, getContactById)  // Protected Admin retrieval
  .delete(protect, deleteContact); // Protected Admin deletion

export default router;