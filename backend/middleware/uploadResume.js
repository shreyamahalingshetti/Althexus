import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';
import path from 'path';

// Cloudinary storage configuration for resumes
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const isPdf = ext === '.pdf';
    
    const baseName = path.basename(file.originalname, ext);
    const cleanBaseName = baseName.replace(/[^a-zA-Z0-9_-]/g, '_');
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const publicId = `${cleanBaseName}-${uniqueSuffix}`;
    
    if (isPdf) {
      return {
        folder: 'althexus/resumes',
        resource_type: 'image',
        public_id: publicId,
        format: 'pdf',
      };
    } else {
      return {
        folder: 'althexus/resumes',
        resource_type: 'raw',
        public_id: `${publicId}${ext}`,
      };
    }
  },
});

// Restrict to pdf, doc, docx file types
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];
  
  const ext = path.extname(file.originalname).toLowerCase();
  const allowedExts = ['.pdf', '.doc', '.docx'];

  if (allowedMimeTypes.includes(file.mimetype) || allowedExts.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, DOC, and DOCX files are allowed for resumes.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

export const uploadResume = upload.single('resume');
