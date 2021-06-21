import express, { Router } from "express";
import { cloudinary } from "../middleware/cloudinary.js";
const router = express.Router();

// route for photo upload to Cloudinary service
router.post("/", async (req, res) => {
  try {
    const photoString = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(photoString, {
      upload_preset: "chef-helper",
    });
    console.log(uploadedResponse);
    res.json({ msg: "Photo successfuly uploaded", imgData: uploadedResponse });
  } catch (error) {
    console.error(error);
  }
});

// route for removing images
router.post("/destroy", async (req, res) => {
  try {
    const { public_id } = req.body;
    console.log(public_id);

    if (!public_id) return res.status(400).json({ msg: "No images found" });

    const deleteResponse = await cloudinary.uploader.destroy(public_id);
    console.log(deleteResponse);
    res.json({ msg: "Photo successfuly deleted" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

export default router;
