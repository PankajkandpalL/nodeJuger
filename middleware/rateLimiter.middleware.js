const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, 
  max: 70,
  message: 'Too many requests from this IP, please try again later.',
  skip: (req) => {
    return req.method !== 'POST';
  },
});
module.exports = {rateLimiter};
