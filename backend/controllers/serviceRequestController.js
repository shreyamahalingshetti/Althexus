import ServiceRequest from '../models/ServiceRequest.js';

// @desc    Create a new service request
// @route   POST /api/service-requests
// @access  Public
export const createServiceRequest = async (req, res, next) => {
  try {
    const { name, email, phone, companyName, serviceRequired, projectDescription } = req.body;

    if (!name || !email || !phone || !serviceRequired || !projectDescription) {
      res.status(400);
      throw new Error('Name, email, phone, serviceRequired, and projectDescription are required');
    }

    const serviceRequest = new ServiceRequest({
      name,
      email,
      phone,
      companyName,
      serviceRequired,
      projectDescription,
    });

    const savedServiceRequest = await serviceRequest.save();
    res.status(201).json(savedServiceRequest);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all service requests (with search, filter, sort, pagination)
// @route   GET /api/service-requests
// @access  Private (Admin only)
export const getServiceRequests = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 10);
    const skip = (page - 1) * limit;
    const sortBy = req.query.sortBy || 'createdAt';
    const order = req.query.order === 'asc' ? 1 : -1;
    const search = req.query.search || '';
    const status = req.query.status || '';

    const query = {};

    if (search) {
      const regex = new RegExp(search, 'i');
      query.$or = [
        { name: regex },
        { companyName: regex },
        { serviceRequired: regex },
      ];
    }

    if (status) {
      query.status = status;
    }

    const [totalDocuments, serviceRequests] = await Promise.all([
      ServiceRequest.countDocuments(query),
      ServiceRequest.find(query)
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
      data: serviceRequests,
    });
  } catch (error) {
    next(error);
  }
};


// @desc    Get single service request by ID
// @route   GET /api/service-requests/:id
// @access  Private (Admin only)
export const getServiceRequestById = async (req, res, next) => {
  try {
    const serviceRequest = await ServiceRequest.findById(req.params.id);
    if (!serviceRequest) {
      res.status(404);
      throw new Error('Service request not found');
    }
    res.status(200).json(serviceRequest);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a service request (e.g. status)
// @route   PUT /api/service-requests/:id
// @access  Private (Admin only)
export const updateServiceRequest = async (req, res, next) => {
  try {
    const { name, email, phone, companyName, serviceRequired, projectDescription, status } = req.body;

    const serviceRequest = await ServiceRequest.findById(req.params.id);

    if (!serviceRequest) {
      res.status(404);
      throw new Error('Service request not found');
    }

    serviceRequest.name = name !== undefined ? name : serviceRequest.name;
    serviceRequest.email = email !== undefined ? email : serviceRequest.email;
    serviceRequest.phone = phone !== undefined ? phone : serviceRequest.phone;
    serviceRequest.companyName = companyName !== undefined ? companyName : serviceRequest.companyName;
    serviceRequest.serviceRequired = serviceRequired !== undefined ? serviceRequired : serviceRequest.serviceRequired;
    serviceRequest.projectDescription = projectDescription !== undefined ? projectDescription : serviceRequest.projectDescription;
    serviceRequest.status = status !== undefined ? status : serviceRequest.status;

    const updatedServiceRequest = await serviceRequest.save();
    res.status(200).json(updatedServiceRequest);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a service request
// @route   DELETE /api/service-requests/:id
// @access  Private (Admin only)
export const deleteServiceRequest = async (req, res, next) => {
  try {
    const serviceRequest = await ServiceRequest.findById(req.params.id);

    if (!serviceRequest) {
      res.status(404);
      throw new Error('Service request not found');
    }

    await serviceRequest.deleteOne();
    res.status(200).json({ message: 'Service request removed successfully' });
  } catch (error) {
    next(error);
  }
};
