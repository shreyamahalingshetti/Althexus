import Settings from '../models/Settings.js';

// @desc    Get settings (creates defaults if none exist)
// @route   GET /api/settings
// @access  Public
export const getSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne({});

    if (!settings) {
      settings = await Settings.create({});
    }

    res.status(200).json(settings);
  } catch (error) {
    next(error);
  }
};

// @desc    Update settings
// @route   PUT /api/settings
// @access  Private (Admin only)
export const updateSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne({});

    if (!settings) {
      settings = await Settings.create({});
    }

    const {
      companyName,
      tagline,
      aboutText,
      email,
      phone,
      address,
      socialLinks,
    } = req.body;

    if (companyName !== undefined) settings.companyName = companyName;
    if (tagline !== undefined) settings.tagline = tagline;
    if (aboutText !== undefined) settings.aboutText = aboutText;
    if (email !== undefined) settings.email = email;
    if (phone !== undefined) settings.phone = phone;
    if (address !== undefined) settings.address = address;
    if (socialLinks !== undefined) settings.socialLinks = socialLinks;

    const updatedSettings = await settings.save();
    res.status(200).json(updatedSettings);
  } catch (error) {
    next(error);
  }
};
