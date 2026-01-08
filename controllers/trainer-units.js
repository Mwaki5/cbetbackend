const db = require('../models');
const createController = require('./genericController');

module.exports = createController(db.TrainerUnit, {
  searchableFields: [],
    filterableFields: ['trainerId', 'unitId', 'sessionId'],
});
