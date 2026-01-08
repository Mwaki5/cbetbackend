const db = require('../models');
const { Op } = require('sequelize');
const { detectCategory } = require('../utils/fileValidator');
const searchable = ['title', 'description'];
const filterable = ['sessionId', 'userId', 'unitId'];

async function list(req, res) {
    try {
        const page = Math.max(parseInt(req.query.page) || 1, 1);
        const limit = Math.min(parseInt(req.query.limit) || 10, 100);
        const offset = (page - 1) * limit;
        const where = {};
        filterable.forEach((f) => { if (typeof req.query[f] !== 'undefined') where[f] = req.query[f]; });
        if (req.query.q) {
            where[Op.or] = searchable.map((s) => ({ [s]: { [Op.iLike]: `%${req.query.q}%` } }));
        }
        let order = [];
        if (req.query.sort) { const parts = req.query.sort.split(':'); order.push([parts[0], (parts[1] || 'ASC').toUpperCase()]); }
        const result = await db.Evidence.findAndCountAll({ where, limit, offset, order });
        return res.json({ data: result.rows, meta: { total: result.count, page, limit, pages: Math.ceil(result.count / limit) || 1 } });
    } catch (err) { console.error(err); return res.status(500).json({ error: 'Server error' }); }
}

async function get(req, res) { try { const item = await db.Evidence.findByPk(req.params.id); if (!item) return res.status(404).json({ error: 'Not found' }); return res.json(item); } catch (err) { console.error(err); return res.status(500).json({ error: 'Server error' }); } }

async function create(req, res) {
    try {
        if (req.file) {
            const category = detectCategory(req.file.mimetype) || 'documents';
            req.body.fileUrl = `/uploads/evidences/${category}/${req.file.filename}`;
            req.body.fileType = req.file.mimetype;
        }
        const item = await db.Evidence.create(req.body);
        return res.status(201).json(item);
    } catch (err) { console.error(err); return res.status(400).json({ error: err.message }); }
}

async function update(req, res) {
    try {
        const item = await db.Evidence.findByPk(req.params.id);
        if (!item) return res.status(404).json({ error: 'Not found' });
        if (req.file) {
            const category = detectCategory(req.file.mimetype) || 'documents';
            req.body.fileUrl = `/uploads/evidences/${category}/${req.file.filename}`;
            req.body.fileType = req.file.mimetype;
        }
        await item.update(req.body);
        return res.json(item);
    } catch (err) { console.error(err); return res.status(400).json({ error: err.message }); }
}

async function remove(req, res) { try { const item = await db.Evidence.findByPk(req.params.id); if (!item) return res.status(404).json({ error: 'Not found' }); await item.destroy(); return res.status(204).end(); } catch (err) { console.error(err); return res.status(500).json({ error: 'Server error' }); } }

module.exports = { list, get, create, update, remove };
