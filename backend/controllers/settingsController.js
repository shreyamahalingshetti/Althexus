import Settings from '../models/Settings.js';

// @desc    Get settings (creates defaults if none exist)
// @route   GET /api/settings
// @access  Public
export const getSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne({});

    if (!settings) {
      settings = await Settings.create({
        companyName: "ALTHEXUS",
        tagline: "Innovative Software Solutions for Modern Businesses",
        aboutText: "Althexus Pvt. Ltd. is a modern technology company focused on building secure, scalable, and user-friendly digital solutions. We help startups and enterprises accelerate growth through innovative software, cloud services, and intelligent technologies.",
        email: "althexusofficial@gmail.com",
        phone: "",
        address: "Meerut, Uttar Pradesh\nRemote-First Company",
        socialLinks: [
          { platform: "LinkedIn", url: "https://www.linkedin.com/company/althexus/" },
          { platform: "Instagram", url: "https://www.instagram.com/althexusofficial/" },
          { platform: "WhatsApp", url: "https://wa.me/message/SV64GDK3P6ZKP1" },
        ],
      });
    } else if (settings.companyName === undefined) {
      settings.companyName = "ALTHEXUS";
      settings.tagline = "Innovative Software Solutions for Modern Businesses";
      settings.aboutText = "Althexus Pvt. Ltd. is a modern technology company focused on building secure, scalable, and user-friendly digital solutions. We help startups and enterprises accelerate growth through innovative software, cloud services, and intelligent technologies.";
      settings.email = "althexusofficial@gmail.com";
      settings.phone = "";
      settings.address = "Meerut, Uttar Pradesh\nRemote-First Company";
      settings.socialLinks = [
        { platform: "LinkedIn", url: "https://www.linkedin.com/company/althexus/" },
        { platform: "Instagram", url: "https://www.instagram.com/althexusofficial/" },
        { platform: "WhatsApp", url: "https://wa.me/message/SV64GDK3P6ZKP1" },
      ];
      await settings.save();
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
