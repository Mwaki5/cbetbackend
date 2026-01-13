const env = require("../utils/env");
const allowedDomains = env.CORS_WHITELIST;
const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedDomains.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  }
};
module.exports = { credentials };
