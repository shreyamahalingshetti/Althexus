import Admin from '../models/Admin.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth admin & get token
// @route   POST /api/auth/login
// @access  Public
export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error('Please provide email and password');
    }

    // Find admin by email
    const admin = await Admin.findOne({ email });

    // Compare entered password hash
    if (admin && (await admin.comparePassword(password))) {
      res.status(200).json({
        token: generateToken(admin._id),
        admin: {
          id: admin._id,
          email: admin.email,
        },
      });
    } else {
      res.status(401);
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get current admin info
// @route   GET /api/auth/me
// @access  Private (Admin only)
export const getAdminProfile = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    if (admin) {
      res.status(200).json({
        id: admin._id,
        email: admin.email,
      });
    } else {
      res.status(404);
      throw new Error('Admin not found');
    }
  } catch (error) {
    next(error);
  }
};
