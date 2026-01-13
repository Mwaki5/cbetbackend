const { Op } = require("sequelize");
const db = require("../models");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

const searchable = ["institutionName", "email", "phone"];
const filterable = ["status"];

async function list(req, res) {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 10, 100);
    const offset = (page - 1) * limit;
    const where = {};

    filterable.forEach((f) => {
      if (typeof req.query[f] !== "undefined") where[f] = req.query[f];
    });

    if (req.query.q) {
      where[Op.or] = searchable.map((f) => ({
        [f]: { [Op.iLike]: `%${req.query.q}%` },
      }));
    }

    let order = [];
    if (req.query.sort) {
      const parts = req.query.sort.split(":");
      order.push([parts[0], (parts[1] || "ASC").toUpperCase()]);
    }

    const result = await db.Institution.findAndCountAll({
      where,
      limit,
      offset,
      order,
    });
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
    return res.status(500).json({ error: "Server error" });
  }
}

async function get(req, res) {
  try {
    const { email } = req.query;
    const item = await db.Institution.findOne({
      where: { email },
      attributes: { exclude: ["passwordHarsh"] },
    });
    if (!item) return res.status(404).json({ error: "Not found" });
    return res.json([item]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

const create = async (req, res) => {
  try {
    const { email, phone, password, status } = req.body;

    if (req.file) {
      req.body.logo = `/uploads/profile/${req.file.filename}`;
    }
    const phoneEmailExists = await db.Institution.findOne({
      where: {
        [Op.or]: [{ phone }, { email }],
      },
    });

    if (phoneEmailExists) {
      return res.status(400).json({ error: "Phone or email already exists" });
    }
    req.body.status = status || "pending";
    if (password) req.body.passwordHarsh = await bcrypt.hash(password, 10);
    const item = await db.Institution.create(req.body);
    return res.status(201).json(item);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
};

async function update(req, res) {
  try {
    const item = await db.Institution.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: "Not found" });
    if (req.file) {
      // delete old logo if local
      if (
        item.logo &&
        typeof item.logo === "string" &&
        item.logo.startsWith("/uploads/")
      ) {
        try {
          const oldRel = item.logo.replace(/^\/+/, "");
          const oldPath = path.join(__dirname, "..", oldRel);
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        } catch (e) {
          console.warn("Failed to delete old logo:", e.message);
        }
      }
      req.body.logo = `/uploads/profile/${req.file.filename}`;
    }
    if (req.body.password)
      req.body.passwordHarsh = await bcrypt.hash(req.body.password, 10);
    await item.update(req.body);
    return res.json(item);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
}

async function remove(req, res) {
  try {
    const item = await db.Institution.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: "Not found" });
    await item.destroy();
    return res.status(204).end();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

module.exports = { list, get, create, update, remove };
