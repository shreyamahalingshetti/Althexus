import Project from '../models/Project.js';

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    res.status(200).json(projects);
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
    const { title, description, images, techStack, clientName } = req.body;

    if (!title || !description) {
      res.status(400);
      throw new Error('Title and description are required');
    }

    const project = new Project({
      title,
      description,
      images: images || [],
      techStack: techStack || [],
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
    const { title, description, images, techStack, clientName } = req.body;

    const project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }

    project.title = title !== undefined ? title : project.title;
    project.description = description !== undefined ? description : project.description;
    project.images = images !== undefined ? images : project.images;
    project.techStack = techStack !== undefined ? techStack : project.techStack;
    project.clientName = clientName !== undefined ? clientName : project.clientName;

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
