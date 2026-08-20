import JobOpening from '../models/JobOpening.js';

// @desc    Get all job openings (with search, sort, pagination)
// @route   GET /api/job-openings
// @access  Public
export const getJobOpenings = async (req, res, next) => {
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
        { title: regex },
        { location: regex },
        { category: regex },
        { type: regex },
      ];
    }

    const [totalDocuments, jobOpenings] = await Promise.all([
      JobOpening.countDocuments(query),
      JobOpening.find(query)
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
      data: jobOpenings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single job opening by ID
// @route   GET /api/job-openings/:id
// @access  Public
export const getJobOpeningById = async (req, res, next) => {
  try {
    const jobOpening = await JobOpening.findById(req.params.id);
    if (!jobOpening) {
      res.status(404);
      throw new Error('Job opening not found');
    }
    res.status(200).json(jobOpening);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new job opening
// @route   POST /api/job-openings
// @access  Private (Admin only)
export const createJobOpening = async (req, res, next) => {
  try {
    const { title, type, category, location } = req.body;

    if (!title || !type) {
      res.status(400);
      throw new Error('Title and type are required');
    }

    const jobOpening = new JobOpening({
      title,
      type,
      category: category || 'Software & IT Development',
      location,
    });

    const savedJobOpening = await jobOpening.save();
    res.status(201).json(savedJobOpening);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a job opening
// @route   PUT /api/job-openings/:id
// @access  Private (Admin only)
export const updateJobOpening = async (req, res, next) => {
  try {
    const { title, type, category, location } = req.body;

    const jobOpening = await JobOpening.findById(req.params.id);

    if (!jobOpening) {
      res.status(404);
      throw new Error('Job opening not found');
    }

    jobOpening.title = title !== undefined ? title : jobOpening.title;
    jobOpening.type = type !== undefined ? type : jobOpening.type;
    jobOpening.category = category !== undefined ? category : jobOpening.category;
    jobOpening.location = location !== undefined ? location : jobOpening.location;

    const updatedJobOpening = await jobOpening.save();
    res.status(200).json(updatedJobOpening);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a job opening
// @route   DELETE /api/job-openings/:id
// @access  Private (Admin only)
export const deleteJobOpening = async (req, res, next) => {
  try {
    const jobOpening = await JobOpening.findById(req.params.id);

    if (!jobOpening) {
      res.status(404);
      throw new Error('Job opening not found');
    }

    await jobOpening.deleteOne();
    res.status(200).json({ message: 'Job opening removed successfully' });
  } catch (error) {
    next(error);
  }
};
