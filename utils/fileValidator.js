const path = require('path');

const IMAGE_MIMES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const VIDEO_MIMES = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-matroska'];
const DOCUMENT_MIMES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];

const DEFAULT_MAX_SIZE = 10 * 1024 * 1024; // 10MB

function detectCategory(mimetype) {
  if (IMAGE_MIMES.includes(mimetype)) return 'pictures';
  if (VIDEO_MIMES.includes(mimetype)) return 'videos';
  if (DOCUMENT_MIMES.includes(mimetype)) return 'documents';
  return null;
}

/**
 * Validate a file with options.
 * options:
 *  - maxSize: number in bytes
 *  - allowedMimes: array of mime types (if provided, used instead of category detection)
 *  - uploadPath: optional path where file will be stored (returned for convenience)
 */
function validateFileUniversal(file, options = {}) {
  const maxSize = options.maxSize || DEFAULT_MAX_SIZE;
  if (!file) throw new Error('No file provided');
  if (!file.mimetype) throw new Error('Invalid file');
  if (file.size && file.size > maxSize) throw new Error('File too large');

  let category = null;
  if (options.allowedMimes && Array.isArray(options.allowedMimes) && options.allowedMimes.length > 0) {
    if (!options.allowedMimes.includes(file.mimetype)) throw new Error('Unsupported file type');
    // try to detect category for downstream path decisions
    category = detectCategory(file.mimetype) || 'documents';
  } else {
    category = detectCategory(file.mimetype);
    if (!category) throw new Error('Unsupported file type');
  }

  return { category, ext: path.extname(file.originalname), uploadPath: options.uploadPath || null };
}

module.exports = { validateFileUniversal, detectCategory, IMAGE_MIMES, VIDEO_MIMES, DOCUMENT_MIMES };
