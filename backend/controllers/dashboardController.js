import ServiceRequest from '../models/ServiceRequest.js';
import JobOpening from '../models/JobOpening.js';
import JobApplication from '../models/JobApplication.js';

// @desc    Get admin dashboard statistics
// @route   GET /api/dashboard
// @access  Private (Admin only)
export const getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalServiceRequests,
      totalJobOpenings,
      totalJobApplications,
    ] = await Promise.all([
      ServiceRequest.countDocuments(),
      JobOpening.countDocuments(),
      JobApplication.countDocuments(),
    ]);

    res.status(200).json({
      totalServiceRequests,
      totalJobOpenings,
      totalJobApplications,
    });
  } catch (error) {
    next(error);
  }
};
