const jwt = require('jsonwebtoken');
const db = require('../models');
const env = require('../config/env');
const e = require('express');

function verifyJwt(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
  const token = auth.slice(7);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || env.JWT_SECRET || 'changeme');
    req.user = payload;
    return next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = verifyJwt;
