require('dotenv').config();

module.exports = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    CLOUDINARY_URL: process.env.CLOUDINARY_URL,
    DB_NAME: process.env.DB_NAME,
    WEB_URI: process.env.WEB_URI,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
    SESSION_SECRET: process.env.SESSION_SECRET,
    IMAGE_SERVER_URL: process.env.IMAGE_SERVER_URL,
    ABLY_API_KEY: process.env.ABLY_API_KEY
  },
  images: {
    domains: ["brebes-social.id"],
  },
};
