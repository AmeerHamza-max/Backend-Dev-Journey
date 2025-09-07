// routes/image-routes.js
const express = require("express");
const router = express.Router();

const uploadMiddleware = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/adminMiddleWare");
const { 
  uploadImage, 
  getAllImages, 
  getImageById,
  deleteImageController, 
} = require("../controllers/image-controller");

// Upload image (admin only)
router.post(
  "/upload",
  authMiddleware,
  adminMiddleware,
  uploadMiddleware.single("image"),
  uploadImage
);

// Fetch all images (any logged-in user can view)
router.get("/", authMiddleware, getAllImages);

// Fetch single image by ID
router.get("/:id", authMiddleware, getImageById);


/////delelte image route
router.delete('/:id',authMiddleware,adminMiddleware,deleteImageController)

module.exports = router;
