// controllers/image-controller.js
const Image = require("../models/image");
const cloudinary = require("../config/cloudinary");
const { uploadToCloudinary } = require("../helpers/cloudinaryHelpers");

// ================= Upload Image =================
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required, please upload an image",
      });
    }

    // Upload to Cloudinary
    const { url, publicId } = await uploadToCloudinary(req.file.path);

    // Save image info in DB
    const newlyUploadedImage = new Image({
      url,
      publicId,
      uploadedBy: req.userInfo.userId, // from authMiddleware
    });

    await newlyUploadedImage.save();

    return res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      image: newlyUploadedImage,
    });
  } catch (error) {
    console.error("Image upload error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

// ================= Fetch All Images (with Pagination) =================
const getAllImages = async (req, res) => {
  try {
    // Extract page & limit from query params
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    // Count total images
    const totalImages = await Image.countDocuments();

    // Fetch paginated images
    const images = await Image.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(totalImages / limit),
      totalImages,
      images,
    });
  } catch (error) {
    console.error("Fetch all images error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch images",
    });
  }
};

// ================= Fetch Single Image by ID =================
const getImageById = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Image.findById(id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    return res.status(200).json({
      success: true,
      image,
    });
  } catch (error) {
    console.error("Fetch image by ID error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch image",
    });
  }
};

// ================= Delete Image =================
const deleteImageController = async (req, res) => {
  try {
    const imageId = req.params.id;
    const userId = req.userInfo.userId;

    const image = await Image.findById(imageId);
    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    // Check if this image belongs to the current user
    if (image.uploadedBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this image",
      });
    }

    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(image.publicId);

    // Delete image from MongoDB
    await Image.findByIdAndDelete(imageId);

    return res.status(200).json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.error("Delete image error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to delete image",
    });
  }
};

module.exports = {
  uploadImage,
  getAllImages,
  getImageById,
  deleteImageController,
};
