const db = require('../models');
const createController = require('./genericController');

module.exports = createController(db.Subscription, {
  searchableFields: ['plan'],
  filterableFields: ['institutionId'],
});
