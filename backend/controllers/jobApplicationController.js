import JobApplication from '../models/JobApplication.js';

// @desc    Create a new job application (Public submission with resume)
// @route   POST /api/job-applications
// @access  Public
export const createJobApplication = async (req, res, next) => {
  try {
    const { name, email, phone, jobTitle, message } = req.body;

    if (!req.file) {
      res.status(400);
      throw new Error('Resume file is required');
    }

    if (!name || !email || !jobTitle) {
      res.status(400);
      throw new Error('Name, email, and jobTitle are required');
    }

    const resumeUrl = req.file.path;

    const jobApplication = new JobApplication({
      name,
      email,
      phone,
      jobTitle,
      resumeUrl,
      message,
    });

    const savedJobApplication = await jobApplication.save();
    res.status(201).json(savedJobApplication);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all job applications (with search, sort, pagination)
// @route   GET /api/job-applications
// @access  Private (Admin only)
export const getJobApplications = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 10);
    const skip = (page - 1) * limit;
    const sortBy = req.query.sortBy || 'createdAt';
    const order = req.query.order === 'asc' ? 1 : -1;
    const search = req.query.search || '';

    const query = {};

    if (search) {
      const regex = new RegExp(search, 'i');
      query.$or = [
        { name: regex },
        { email: regex },
        { jobTitle: regex },
      ];
    }

    const [totalDocuments, jobApplications] = await Promise.all([
      JobApplication.countDocuments(query),
      JobApplication.find(query)
        .sort({ [sortBy]: order })
        .skip(skip)
        .limit(limit),
    ]);

    res.status(200).json({
      success: true,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalDocuments / limit),
        totalDocuments,
        pageSize: limit,
      },
      data: jobApplications,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single job application by ID
// @route   GET /api/job-applications/:id
// @access  Private (Admin only)
export const getJobApplicationById = async (req, res, next) => {
  try {
    const jobApplication = await JobApplication.findById(req.params.id);
    if (!jobApplication) {
      res.status(404);
      throw new Error('Job application not found');
    }
    res.status(200).json(jobApplication);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a job application
// @route   DELETE /api/job-applications/:id
// @access  Private (Admin only)
export const deleteJobApplication = async (req, res, next) => {
  try {
    const jobApplication = await JobApplication.findById(req.params.id);

    if (!jobApplication) {
      res.status(404);
      throw new Error('Job application not found');
    }

    await jobApplication.deleteOne();
    res.status(200).json({ message: 'Job application removed successfully' });
  } catch (error) {
    next(error);
  }
};
