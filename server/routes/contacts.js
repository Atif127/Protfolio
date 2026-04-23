import express from 'express';
import { createContact } from '../controllers/contactController.js';
import { validateContact } from '../middleware/validate.js';

const router = express.Router();

router.route('/').post(validateContact, createContact);

export default router;

