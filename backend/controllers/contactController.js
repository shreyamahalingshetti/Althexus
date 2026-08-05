import Contact from '../models/Contact.js';

// @desc    Create a new contact message (Public form submission)
// @route   POST /api/contacts
// @access  Public
export const createContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      res.status(400);
      throw new Error('All fields are required');
    }

    const contact = new Contact({
      name,
      email,
      subject,
      message,
    });

    const savedContact = await contact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact messages (Admin Only)
// @route   GET /api/contacts
// @access  Private (Admin only)
export const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single contact message by ID (Admin Only)
// @route   GET /api/contacts/:id
// @access  Private (Admin only)
export const getContactById = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error('Contact message not found');
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a contact message (Admin Only)
// @route   DELETE /api/contacts/:id
// @access  Private (Admin only)
export const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      res.status(404);
      throw new Error('Contact message not found');
    }

    await contact.deleteOne();
    res.status(200).json({ message: 'Contact message removed successfully' });
  } catch (error) {
    next(error);
  }
};