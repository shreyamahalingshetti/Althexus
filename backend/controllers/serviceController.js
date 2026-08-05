import Service from '../models/Service.js';

// @desc    Get all services
// @route   GET /api/services
// @access  Public
export const getServices = async (req, res, next) => {
  try {
    const services = await Service.find({}).sort({ createdAt: -1 });
    res.status(200).json(services);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single service by ID
// @route   GET /api/services/:id
// @access  Public
export const getServiceById = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      res.status(404);
      throw new Error('Service not found');
    }
    res.status(200).json(service);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new service
// @route   POST /api/services
// @access  Private (Admin only)
export const createService = async (req, res, next) => {
  try {
    const { title, description, icon } = req.body;

    if (!title || !description) {
      res.status(400);
      throw new Error('Title and description are required');
    }

    const service = new Service({
      title,
      description,
      icon,
    });

    const savedService = await service.save();
    res.status(201).json(savedService);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Private (Admin only)
export const updateService = async (req, res, next) => {
  try {
    const { title, description, icon } = req.body;

    const service = await Service.findById(req.params.id);

    if (!service) {
      res.status(404);
      throw new Error('Service not found');
    }

    service.title = title !== undefined ? title : service.title;
    service.description = description !== undefined ? description : service.description;
    service.icon = icon !== undefined ? icon : service.icon;

    const updatedService = await service.save();
    res.status(200).json(updatedService);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Private (Admin only)
export const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      res.status(404);
      throw new Error('Service not found');
    }

    await service.deleteOne();
    res.status(200).json({ message: 'Service removed successfully' });
  } catch (error) {
    next(error);
  }
};
