import Contact from '../models/Contact.js';
import asyncHandler from '../utils/asyncHandler.js';

export const createContact = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  await Contact.create({ name, email, message });

  res.status(201).json({
    status: 'success',
    message: 'Message sent successfully',
  });
});

