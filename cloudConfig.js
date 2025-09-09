const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// // 🔎 Debug line (add yaha pe)
// console.log("Cloudinary Config:", {
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET ? "loaded" : "missing"
// });

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "wanderlust_dev",
    allowed_formats: ["jpg", "png", "jpeg"],
    
  },
});

module.exports = { cloudinary, storage };

