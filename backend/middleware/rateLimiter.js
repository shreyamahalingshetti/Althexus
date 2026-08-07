import rateLimit from 'express-rate-limit';

// Strict rate limiter for admin login to prevent brute-force attacks
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per windowMs
  message: { message: 'Too many login attempts, please try again later.' },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Looser rate limiter for public form submissions to prevent spam flooding
export const publicFormLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 submissions per windowMs
  message: { message: 'Too many submissions from this IP, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
