const jwt = require("jsonwebtoken");
const db = require("../models");
const env = require("../utils/env");
const e = require("express");

function verifyJwt(req, res, next) {
  const auth = req.headers.authorization || req.headers.Authorization;
  if (!auth || !auth.startsWith("Bearer "))
    return res.status(401).json({ error: "Unauthorized" });
  const token = auth.split(" ")[1];
  try {
    const payload = jwt.verify(token, env.ACCESS_TOKEN_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = verifyJwt;
