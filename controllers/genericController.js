const { Op } = require('sequelize');

function createController(Model, options = {}) {
  const searchable = options.searchableFields || [];
  const filterable = options.filterableFields || [];

  async function list(req, res) {
    try {
      const page = Math.max(parseInt(req.query.page) || 1, 1);
      const limit = Math.min(parseInt(req.query.limit) || 10, 100);
      const offset = (page - 1) * limit;

      const where = {};

      // filters
      filterable.forEach((field) => {
        if (typeof req.query[field] !== 'undefined') {
          where[field] = req.query[field];
        }
      });

      // search (q) across searchable fields
      if (req.query.q && searchable.length) {
        where[Op.or] = searchable.map((f) => ({ [f]: { [Op.iLike]: `%${req.query.q}%` } }));
      }

      // sorting
      let order = [];
      if (req.query.sort) {
        const parts = req.query.sort.split(':');
        order.push([parts[0], (parts[1] || 'ASC').toUpperCase()]);
      }

      const result = await Model.findAndCountAll({ where, limit, offset, order });

      return res.json({
        data: result.rows,
        meta: {
          total: result.count,
          page,
          limit,
          pages: Math.ceil(result.count / limit) || 1,
        },
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }
  }

  async function get(req, res) {
    try {
      const pk = Model.primaryKeyAttribute || 'id';
      const item = await Model.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'Not found' });
      return res.json(item);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }
  }

  async function create(req, res) {
    try {
      const item = await Model.create(req.body);
      return res.status(201).json(item);
    } catch (err) {
      console.error(err);
      return res.status(400).json({ error: err.message });
    }
  }

  async function update(req, res) {
    try {
      const item = await Model.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'Not found' });
      await item.update(req.body);
      return res.json(item);
    } catch (err) {
      console.error(err);
      return res.status(400).json({ error: err.message });
    }
  }

  async function remove(req, res) {
    try {
      const item = await Model.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'Not found' });
      await item.destroy();
      return res.status(204).end();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }
  }

  return { list, get, create, update, remove };
}

module.exports = createController;
