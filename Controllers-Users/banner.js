const bannerSchema = require("../Models-Users/Banner");
const multer = require('multer');
const fs = require('fs').promises;
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'banner-uploads'); // Uploads folder where images will be stored
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); 
    }
  });
  
  const upload = multer({ storage: storage }).array('BannerImages', 10);

  //post method
  const postBanner = async (req, res) => {
    try {
      // Upload images using multer
      await new Promise((resolve, reject) => {
        upload(req, res, (err) => {
          if (err) {
            console.error(err);
            return reject("Error uploading image");
          }
          resolve();
        });
      });
  
      // Create banner object with uploaded image data
      const { BannerName, BannerDescription } = req.body;
      const bannerImages = req.files.map(file => ({
        imagePath: file.path,
        mimetype: file.mimetype
      }));
  
      const newBanner = new bannerSchema({
        BannerName,
        BannerDescription,
        BannerImages: bannerImages
      });
  
      // Save the new banner to the database
      await newBanner.save();
  
      // Respond with success message and data
      return res.status(201).json({ message: "Banner created successfully", data: newBanner });
    } catch (error) {
      console.error("Error creating banner", error.message);
  
      // Return server error if save operation fails
      return res.status(500).json({ error: "Failed to create banner" });
    }
  };

//get all banners
const getAllBanners =  async (req, res) => {
    try {
        // Fetch all banners from database
        const allBanners = await bannerSchema.find();

        // Check if banners exist
        if (allBanners.length === 0) {
            return res.status(404).json({ message: 'No banners found' });
        }

        // Respond with all banners
        return res.status(200).json(allBanners);
    } catch (error) {
        console.error('Error fetching banners', error);
        return res.status(500).json({ error: "Failed to fetch banners" });
    }
};
//Update Banner by ID
const updateBanner = async (req, res) => {
    const bannerId = req.params.id;
    try {
        // Check if banner exists
        const existingBanner = await bannerSchema.findById(bannerId);
        if (!existingBanner) {
            return res.status(404).json({ error: "Banner not found" });
        }

        // Update banner fields if provided in request body
        if (req.body.BannerName) {
            existingBanner.BannerName = req.body.BannerName;
        }
        if (req.body.BannerDescription) {
            existingBanner.BannerDescription = req.body.BannerDescription;
        }

        // Save updated banner to database
        await existingBanner.save();

        // Response with success message and updated banner data
        return res.status(200).json({ message: "Banner updated successfully", data: existingBanner });
    } catch (error) {
        console.error("Error updating banner", error);
        return res.status(500).json({ error: "Failed to update banner" });
    }
};
//Delete Banner by ID
const deleteBanner = async (req, res) => {
    const bannerId = req.params.id;
    try {
        // Find banner by ID and delete
        const deletedBanner = await bannerSchema.findByIdAndDelete(bannerId);

        // Check if banner was found and deleted
        if (!deletedBanner) {
            return res.status(404).json({ message: 'Banner not found' });
        }

        // Delete banner image file from server
        await fs.unlink(path.join('banner-uploads', deletedBanner.BannerImageUrl)); // BannerImageUrl is the file path

        // Respond with success message
        return res.status(200).json({ message: 'Banner deleted successfully' });
    } catch (error) {
        console.error("Error deleting banner", error);
        return res.status(500).json({ error: "Failed to delete banner" });
    }
};


module.exports={postBanner,getAllBanners,updateBanner,deleteBanner};