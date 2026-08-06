import express from 'express';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';
import protect from '../middleware/authMiddleware.js';
import { uploadImages } from '../middleware/upload.js';

const router = express.Router();

router.route('/')
  .get(getProjects)
  .post(protect, uploadImages, createProject);

router.route('/:id')
  .get(getProjectById)
  .put(protect, uploadImages, updateProject)
  .delete(protect, deleteProject);

export default router;
