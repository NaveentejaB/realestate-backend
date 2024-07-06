const userCategoryXrefSchema = require("../Models-Users/UserCategoryXref-md");

// Post User-Category relationship
const postUserCategoryXref = async (req, res) => {
    const { UserId, CategoryId } = req.body;
    try {
        // Create a new instance of userCategoryXrefSchema with request body
        const oNewUserCategoryXref = new userCategoryXrefSchema({
            UserId,
            CategoryId
        });

        // Save the new User-Category relationship to the database
        await oNewUserCategoryXref.save();

        // Respond with success message and saved relationship details
        return res.status(200).json({ message: "User-Category relationship saved successfully", oNewUserCategoryXref });
    } catch (error) {
        console.error("Error saving User-Category relationship", error.message);
        
        // Return server error if save operation fails
        return res.status(500).json({ error: "Failed to save User-Category relationship" });
    }
};


/* //get
const getAllUserCategoryXrefs = async (req, res) => {
    try {
        const allUserCategoryXrefs = await userCategoryXrefSchema.find().populate('UserId CategoryId');
        return res.json(allUserCategoryXrefs);
    } catch (error) {
        console.error("Error fetching User-Category relationships", error.message);
        return res.status(500).json({ error: "Failed to fetch User-Category relationships" });
    }
}; */
//get all usercategoryxrefs
const getAllUserCategoryXrefs = async (req, res) => {
    try {
        const allUserCategoryXrefs = await userCategoryXrefSchema.aggregate([
            {
                $lookup: {
                    from: 'users', // The collection to join with
                    localField: 'UserId', // Field from the current collection
                    foreignField: '_id', // Field from the 'users' collection
                    as: 'user' // Output array field name
                }
            },
            {
                $lookup: {
                    from: 'categories', // The collection to join with
                    localField: 'CategoryId', // Field from the current collection
                    foreignField: '_id', // Field from the 'categories' collection
                    as: 'category' // Output array field name
                }
            },
            {
                $project: {
                    _id: 1, // Include the _id field
                    user: { $arrayElemAt: ['$user', 0] }, // Unwind the user array and get the first element
                    category: { $arrayElemAt: ['$category', 0] } // Unwind the category array and get the first element
                }
            }
        ]);

        // Check if any userCategoryXrefs found
        if (!allUserCategoryXrefs || allUserCategoryXrefs.length === 0) {
            return res.status(404).json({ message: 'User-Category relationships not found' });
        }

        // Respond with success message and data
        return res.status(200).json({ message: 'User-Category relationships fetched successfully', data: allUserCategoryXrefs });
    } catch (error) {
        console.error("Error fetching User-Category relationships", error.message);
        return res.status(500).json({ error: "Failed to fetch User-Category relationships" });
    }
};


// Update User-Category relationship by ID
const updateUserCategoryXref = async (req, res) => {
    const { UserId, CategoryId } = req.body;
    const id = req.params.id;
    try {
        // Define update object with new User-Category relationship details
        const update = { UserId, CategoryId };
        
        // Find User-Category relationship by ID and update with new details
        const updatedUserCategoryXref = await userCategoryXrefSchema.findByIdAndUpdate(id, update, { new: true });
        
        // Check if User-Category relationship exists
        if (!updatedUserCategoryXref) {
            return res.status(404).json({ error: "User-Category relationship not found" });
        }
        
        // Respond with updated User-Category relationship details
        return res.status(200).json({message:"User-category relationship saved sucessfully",updatedUserCategoryXref});
    } catch (error) {
        console.error("Error updating User-Category relationship", error.message);
        
        // Log error message and return server error
        return res.status(500).json({ error: "Failed to update User-Category relationship" });
    }
};
// Delete User-Category relationship by ID
const deleteUserCategoryXref = async (req, res) => {
    try {
        // Find User-Category relationship by ID and delete
        const deletedUserCategoryXref = await userCategoryXrefSchema.findByIdAndDelete(req.params.id);
        
        // Check if User-Category relationship exists
        if (!deletedUserCategoryXref) {
            return res.status(404).json({ message: 'User-Category relationship not found' });
        }
        
        // Respond with success message
        return res.status(200).json({ message: 'User-Category relationship deleted successfully' });
    } catch (error) {
        console.error("Error deleting User-Category relationship", error.message);
        
        // Log error message and return server error
        return res.status(500).json({ error: "Failed to delete User-Category relationship" });
    }
};



module.exports={postUserCategoryXref,updateUserCategoryXref,getAllUserCategoryXrefs,deleteUserCategoryXref};