const env = require("../utils/env");
const allowedDomains = env.CORS_WHITELIST;

const corsOption = {
  origin: (origin, callback) => {
    if (allowedDomains.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Domain not allowed by cors"));
    }
  },
  credentials: true,
  optionSuccessStatus: 200,
};

module.exports = {
  corsOption,
};
