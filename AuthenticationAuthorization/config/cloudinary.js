const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,   // also fixed key name
  api_secret: process.env.CLOUDINARY_API_SECRET, // added process.env
});

module.exports = cloudinary;
