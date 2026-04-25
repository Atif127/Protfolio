import express from 'express';
import { getProjects, getProject, createProject, deleteProject } from '../controllers/projectController.js';
import { protect } from '../middleware/auth.js';
import { validateProject } from '../middleware/validate.js';
import { upload } from '../middleware/upload.middleware.js';

const router = express.Router();

router.route('/')
  .get(getProjects)
  .post(protect, upload.single('image'), validateProject, createProject);

router.route('/:id')
  .get(getProject)
  .delete(protect, deleteProject);

export default router;

