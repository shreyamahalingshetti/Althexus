import Project from '../models/Project.js';
import Service from '../models/Service.js';
import Contact from '../models/Contact.js';
import ServiceRequest from '../models/ServiceRequest.js';
import JobOpening from '../models/JobOpening.js';
import JobApplication from '../models/JobApplication.js';

// @desc    Get admin dashboard statistics
// @route   GET /api/dashboard
// @access  Private (Admin only)
export const getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalProjects,
      totalServices,
      totalContacts,
      totalServiceRequests,
      totalJobOpenings,
      totalJobApplications,
    ] = await Promise.all([
      Project.countDocuments(),
      Service.countDocuments(),
      Contact.countDocuments(),
      ServiceRequest.countDocuments(),
      JobOpening.countDocuments(),
      JobApplication.countDocuments(),
    ]);

    res.status(200).json({
      totalProjects,
      totalServices,
      totalContacts,
      totalServiceRequests,
      totalJobOpenings,
      totalJobApplications,
    });
  } catch (error) {
    next(error);
  }
};
