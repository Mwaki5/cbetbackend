const db = require('../models');
const createController = require('./genericController');

module.exports = createController(db.ActivityLog, {
  searchableFields: ['action', 'entity'],
  filterableFields: ['userId', 'institutionId'],
});
