import mongoose from 'mongoose';
import { env } from '../config/env.js';
import { connectDB } from '../config/db.js';
import Settings from '../models/Settings.js';

const updateSettings = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Check if settings already exist
    let settings = await Settings.findOne({});

    if (!settings) {
      console.log('No settings found. Creating settings...');
      settings = new Settings({
        companyName: "ALTHEXUS",
        tagline: "Innovative Software Solutions for Modern Businesses",
        aboutText: "Althexus Pvt. Ltd. is a modern technology company focused on building secure, scalable, and user-friendly digital solutions. We help startups and enterprises accelerate growth through innovative software, cloud services, and intelligent technologies.",
        phone: "",
        address: "Meerut, Uttar Pradesh\nRemote-First Company",
      });
    }

    settings.email = "althexusofficial@gmail.com";
    settings.socialLinks = [
      { platform: "Website", url: "https://althexus.com/" },
      { platform: "LinkedIn", url: "https://www.linkedin.com/company/althexus/" },
      { platform: "Instagram", url: "https://www.instagram.com/althexusofficial" },
      { platform: "Facebook", url: "https://www.facebook.com/share/1EgYt1N6gj/" },
      { platform: "X (Twitter)", url: "https://x.com/Althexus" },
      { platform: "YouTube", url: "https://youtube.com/@althexus?si=zNrxkR3BGHtVy6XT" },
      { platform: "WhatsApp", url: "https://api.whatsapp.com/message/SV64GDK3P6ZKP" },
      { platform: "WhatsApp Channel", url: "https://whatsapp.com/channel/0029Vb8oq4N7T8bXJ5eo9W1a" },
    ];

    await settings.save();
    console.log('Settings document updated successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Update failed: ${error.message}`);
    process.exit(1);
  }
};

updateSettings();
