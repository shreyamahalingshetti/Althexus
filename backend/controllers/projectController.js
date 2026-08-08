import Project from '../models/Project.js';

// @desc    Get all projects (with search, sort, pagination)
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res, next) => {
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
        { description: regex },
        { techStack: regex },
      ];
    }

    const [totalDocuments, projects] = await Promise.all([
      Project.countDocuments(query),
      Project.find(query)
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
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};


// @desc    Get single project by ID
// @route   GET /api/projects/:id
// @access  Public
export const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private (Admin only)
export const createProject = async (req, res, next) => {
  try {
    const { title, description, techStack, clientName } = req.body;

    if (!title || !description) {
      res.status(400);
      throw new Error('Title and description are required');
    }

    // Build image URL paths from multer-uploaded files
    const uploadedImages = req.files && req.files.length > 0
      ? req.files.map((file) => `/uploads/${file.filename}`)
      : [];

    const project = new Project({
      title,
      description,
      images: uploadedImages,
      techStack: techStack ? (Array.isArray(techStack) ? techStack : [techStack]) : [],
      clientName,
    });

    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private (Admin only)
export const updateProject = async (req, res, next) => {
  try {
    const { title, description, techStack, clientName } = req.body;

    const project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }

    project.title = title !== undefined ? title : project.title;
    project.description = description !== undefined ? description : project.description;
    project.clientName = clientName !== undefined ? clientName : project.clientName;

    if (techStack !== undefined) {
      project.techStack = Array.isArray(techStack) ? techStack : [techStack];
    }

    // New uploads replace the existing images array; no new files = keep existing
    if (req.files && req.files.length > 0) {
      project.images = req.files.map((file) => `/uploads/${file.filename}`);
    }

    const updatedProject = await project.save();
    res.status(200).json(updatedProject);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private (Admin only)
export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }

    await project.deleteOne();
    res.status(200).json({ message: 'Project removed successfully' });
  } catch (error) {
    next(error);
  }
};
