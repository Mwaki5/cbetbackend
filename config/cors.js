const env = require("../utils/env");
const raw = env.CORS_WHITELIST || "";

const whitelist = raw
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
module.exports = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow server-to-server or curl requests
    if (whitelist.length === 0 || whitelist.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
};
