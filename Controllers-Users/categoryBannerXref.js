const categoryBannerXrefSchema = require("../Controllers-Users/categoryBannerXref");

//Post Category-Banner 
const postCategoryBannerXref = async (req, res) => {
    const { CategoryId, BannerId } = req.body;
    try {
        // Create a new instance of CategoryBannerXref with request body
        const newCategoryBannerXref = new categoryBannerXrefSchema({
            CategoryId,
            BannerId
        });

        // Save the new Category-Banner relationship to the database
        await newCategoryBannerXref.save();

        // Respond with success message and saved relationship details
        return res.status(200).json({ message: "Category-Banner relationship saved successfully", data: newCategoryBannerXref });
    } catch (error) {
        console.error("Error saving Category-Banner relationship", error.message);
        
        // Return server error if save operation fails
        return res.status(500).json({ error: "Failed to save Category-Banner relationship" });
    }
};
//Get All Category
const getAllCategoryBannerXrefs = async (req, res) => {
    try {
        // Fetch all Category-Banner relationships with populated references
        const allCategoryBannerXrefs = await categoryBannerXrefSchema.aggregate([
            {
                $lookup: {
                    from: 'categories', // Collection to join with
                    localField: 'CategoryId', // Field from current collection
                    foreignField: '_id', // Field from 'categories' collection
                    as: 'category' // Output array field name
                }
            },
            {
                $lookup: {
                    from: 'banners', // Collection to join with
                    localField: 'BannerId', // Field from current collection
                    foreignField: '_id', // Field from 'banners' collection
                    as: 'banner' // Output array field name
                }
            },
            {
                $project: {
                    _id: 1, // Include the _id field
                    category: { $arrayElemAt: ['$category', 0] }, // Unwind the category array and get the first element
                    banner: { $arrayElemAt: ['$banner', 0] } // Unwind the banner array and get the first element
                }
            }
        ]);

        // Check if any Category-Banner relationships found
        if (!allCategoryBannerXrefs || allCategoryBannerXrefs.length === 0) {
            return res.status(404).json({ message: 'Category-Banner relationships not found' });
        }

        // Respond with success message and data
        return res.status(200).json({ message: 'Category-Banner relationships fetched successfully', data: allCategoryBannerXrefs });
    } catch (error) {
        console.error("Error fetching Category-Banner relationships", error.message);
        return res.status(500).json({ error: "Failed to fetch Category-Banner relationships" });
    }
};
//Update Category-Banner Relationship by ID
const updateCategoryBannerXref = async (req, res) => {
    const { CategoryId, BannerId } = req.body;
    const id = req.params.id;
    try {
        // update object with new Category-Banner relationship details
        const update = { CategoryId, BannerId };
        
        // Find Category-Banner relationship by ID and update with new details
        const updatedCategoryBannerXref = await categoryBannerXrefSchema.findByIdAndUpdate(id, update, { new: true });
        
        // Check if Category-Banner relationship exists
        if (!updatedCategoryBannerXref) {
            return res.status(404).json({ error: "Category-Banner relationship not found" });
        }
        
        // Respond with updated Category-Banner relationship details
        return res.status(200).json({ message: "Category-Banner relationship updated successfully", data: updatedCategoryBannerXref });
    } catch (error) {
        console.error("Error updating Category-Banner relationship", error.message);
        
        // Log error message and return server error
        return res.status(500).json({ error: "Failed to update Category-Banner relationship" });
    }
};
//Delete categorybanner
const deleteCategoryBannerXref = async (req, res) => {
    try {
        // Find Category-Banner relationship by ID and delete
        const deletedCategoryBannerXref = await categoryBannerXrefSchema.findByIdAndDelete(req.params.id);
        
        // Check if Category-Banner relationship was found and deleted
        if (!deletedCategoryBannerXref) {
            return res.status(404).json({ message: 'Category-Banner relationship not found' });
        }
        
        // Respond with success message
        return res.status(200).json({ message: 'Category-Banner relationship deleted successfully' });
    } catch (error) {
        console.error("Error deleting Category-Banner relationship", error.message);
        
        // Log error message and return server error
        return res.status(500).json({ error: "Failed to delete Category-Banner relationship" });
    }
};

module.exports ={postCategoryBannerXref,getAllCategoryBannerXrefs,updateCategoryBannerXref,deleteCategoryBannerXref};
