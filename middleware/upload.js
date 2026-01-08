const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { detectCategory, validateFileUniversal, IMAGE_MIMES, VIDEO_MIMES, DOCUMENT_MIMES } = require('../utils/fileValidator');

const PUBLIC_ROOT = path.join(__dirname, '..', 'public', 'uploads');

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function createUploader(options = {}) {
  const { profile = false, allowedMimes = null, maxSize = null, baseRoot = PUBLIC_ROOT } = options;

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      try {
        if (profile) {
          const dir = path.join(baseRoot, 'profile');
          ensureDir(dir);
          return cb(null, dir);
        }
        const detected = detectCategory(file.mimetype) || 'documents';
        const dir = path.join(baseRoot, 'evidences', detected);
        ensureDir(dir);
        return cb(null, dir);
      } catch (err) {
        return cb(err);
      }
    },
    filename: function (req, file, cb) {
      const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
      const name = `${Date.now()}-${Math.floor(Math.random() * 1e6)}-${safeName}`;
      cb(null, name);
    }
  });

  function fileFilter(req, file, cb) {
    try {
      const opts = {};
      if (maxSize) opts.maxSize = maxSize;
      if (allowedMimes) opts.allowedMimes = allowedMimes;
      // validate; will throw on error
      validateFileUniversal(file, opts);
      // additional check: profiles only allow images
      if (profile) {
        const cat = detectCategory(file.mimetype);
        if (!cat || cat !== 'pictures') return cb(new Error('Only image files allowed for profile'));
      }
      cb(null, true);
    } catch (err) {
      cb(err);
    }
  }

  const limits = {};
  if (maxSize) limits.fileSize = maxSize;

  return multer({ storage, fileFilter, limits });
}

const uploadProfile = createUploader({ profile: true, allowedMimes: IMAGE_MIMES, maxSize: 5 * 1024 * 1024 });
const uploadEvidence = createUploader({ profile: false, allowedMimes: IMAGE_MIMES.concat(VIDEO_MIMES, DOCUMENT_MIMES), maxSize: 50 * 1024 * 1024 });

module.exports = { createUploader, uploadProfile, uploadEvidence };
