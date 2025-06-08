const { v2:cloudinary } = require("cloudinary");
const streamifier = require("streamifier");

const uploadImage = async (req, res) => {
    if(!req.file) return res.status(404).json({message:"file not found"});
  try {
    cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          public_id: "profolio-" + Date.now() + req.file.originalname,
          folder: "portfolio_images",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
    res.status(200).json({ message: "Upload success", url: uploadResult.secure_url });
  } catch (error) {
    res.status(500).json({ message: "Error in uploading" });
    console.log("Error in upload:"+error);
  }
};

module.exports = { uploadImage };
