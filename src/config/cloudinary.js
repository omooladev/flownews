import cloudinary from "cloudinary";

cloudinary.config({ secure: true, cloudinary_url: process.env.CLOUDINARY_URL });

//<----------------------------------------------------------------------------->
module.exports = { cloudinary };
