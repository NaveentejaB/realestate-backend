const imagesSchema = require("../Models-realEstate/Image");
const multer = require('multer');
const fs = require('fs').promises;
const path = require('path');

// Multer configuration for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads'); // Directory where images will be stored
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use original filename
    }
});

const upload = multer({ storage: storage }).array('ImageUrl', 10);

// Post image details
const postImage = async (req, res) => {
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

        // Check if req.files is empty or undefined
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "No images uploaded" });
        }

        // Create array to store new image instances
        let newImages = [];

        // Iterate through uploaded files and create new Image instances
        req.files.forEach(file => {
            const { Description, Default, PropertyId, UserId } = req.body;
            const newImage = new imagesSchema({
                ImageUrl: file.path,
                Description,
                Default,
                PropertyId,
                UserId
            });
            newImages.push(newImage);
        });

        // Save all images to the database
        const savedImages = await imagesSchema.insertMany(newImages);

        // Respond with success message and data
        return res.status(201).json({ message: "Images uploaded successfully", data: savedImages });
    } catch (error) {
        console.error("Error uploading image", error.message);

        // Return server error if save operation fails
        return res.status(500).json({ error: "Failed to upload image" });
    }
};

// Get all images with property and user details
const getAllImages = async (req, res) => {
    try {
        const allImages = await imagesSchema.aggregate([
            {
                $lookup: {
                    from: 'realestateproperties', // Collection to join with
                    localField: 'PropertyId', // Field from current collection
                    foreignField: '_id', // Field from 'realestateproperties' collection
                    as: 'property' // Output array field name
                }
            },
            {
                $lookup: {
                    from: 'usermanagements', // Collection to join with
                    localField: 'UserId', // Field from current collection
                    foreignField: '_id', // Field from 'usermanagements' collection
                    as: 'user' // Output array field name
                }
            },
            {
                $project: {
                    _id: 1, // Include the _id field
                    ImageUrl: 1,
                    Description: 1,
                    Default: 1,
                    property: { $arrayElemAt: ['$property', 0] }, // Unwind the property array and get the first element
                    user: { $arrayElemAt: ['$user', 0] } // Unwind the user array and get the first element
                }
            }
        ]);

        // Check if any images found
        if (!allImages || allImages.length === 0) {
            return res.status(404).json({ message: 'Images not found' });
        }

        // Respond with success message and data
        return res.status(200).json({ message: 'Images fetched successfully', data: allImages });
    } catch (error) {
        console.error("Error fetching images", error.message);
        
        // Return server error if fetch operation fails
        return res.status(500).json({ error: "Failed to fetch images" });
    }
};

// Update image by ID
const updateImage = async (req, res) => {
    const { ImageUrl, Description, Default, PropertyId, UserId } = req.body;
    const id = req.params.id;

    try {
        // Define update object with new image details
        const update = {
            ImageUrl,
            Description,
            Default,
            PropertyId,
            UserId
        };
        
        // Find image by ID and update with new details
        const updatedImage = await imagesSchema.findByIdAndUpdate(id, update, { new: true });
        
        // Check if image exists
        if (!updatedImage) {
            return res.status(404).json({ error: "Image not found" });
        }
        
        // Respond with updated image details
        return res.status(200).json({ message: "Image updated successfully", data: updatedImage });
    } catch (error) {
        console.error("Error updating image", error.message);
        
        // Return server error if update operation fails
        return res.status(500).json({ error: "Failed to update image" });
    }
};

// Delete image by ID
const deleteImage = async (req, res) => {
    try {
        // Find image by ID and delete
        const deletedImage = await imagesSchema.findByIdAndDelete(req.params.id);
        
        // Check if image was found and deleted
        if (!deletedImage) {
            return res.status(404).json({ message: 'Image not found' });
        }
        
        // Respond with success message
        return res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
        console.error("Error deleting image", error.message);
        
        // Return server error if delete operation fails
        return res.status(500).json({ error: "Failed to delete image" });
    }
};

module.exports = {postImage,getAllImages,updateImage,deleteImage};