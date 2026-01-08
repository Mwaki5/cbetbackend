module.exports = function requireFileOrField(fieldName) {
  return (req, res, next) => {
    if (req.file) return next();
    if (req.body && typeof req.body[fieldName] === 'string' && req.body[fieldName].trim() !== '') return next();
    return res.status(400).json({ error: `Either upload a file (${fieldName}) or provide ${fieldName} in the body` });
  };
};
