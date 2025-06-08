const { v2 } = require("cloudinary");
const cloudinary = v2;
const fs = require("fs");

const uploadImage = async (req, res) => {
    if(!req.file) return res.status(404).json({message:"file not found"});
  try {
    cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });
    // Upload an image
    const uploadResult = await cloudinary.uploader.upload(`${req.file.path}`, {
      public_id: `${req.file.filename}`,
    });
    if (!uploadResult) return res.status(400).json({ message: "Upload failed" });
    // Optimize quality
    const optimizeUrl = cloudinary.url(`${uploadResult.secure_url}`, {
      fetch_format: "auto",
      quality: "auto",
    });
    fs.unlink(`${req.file.path}`, function (err) {
      if (err) throw err;
      console.log("File deleted!");
    });
    res.status(200).json({ message: "Upload success", url: optimizeUrl });
  } catch (error) {
    res.status(500).json({ message: "Error in uploading" });
    console.log("Error in upload:"+error);
  }
};

module.exports = { uploadImage };
