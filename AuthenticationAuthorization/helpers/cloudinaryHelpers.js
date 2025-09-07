// helpers/cloudinaryHelpers.js
const cloudinary = require("../config/cloudinary"); // your cloudinary config
const fs = require("fs");

const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "uploads",
    });

    // Remove local file after upload
    fs.unlinkSync(filePath);

    return { url: result.secure_url, publicId: result.public_id };
  } catch (error) {
    throw new Error("Cloudinary upload failed: " + error.message);
  }
};

module.exports = { uploadToCloudinary };
