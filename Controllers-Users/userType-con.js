const userTypeSchema = require("../Models-Users/UserType-md");


// Post user type details
const postuserType = async (req, res) => {
    const { UserTypeName, Description } = req.body;
    try {
        // Create a new field of userTypeSchema with request body
        const newuserType = new userTypeSchema({
            UserTypeName,
            Description
        });

        // Save the new user type to the database
        await newuserType.save();

        //return all user types from the database after saving
        const oData = await userTypeSchema.find();

        // Respond with success message and updated data
        return res.status(200).json({ message: "New user type saved successfully...", oData });
    } catch (error) {
        console.error("Error saving user type", error.message);
        
        // Return server error if save operation fails
        return res.status(500).json({ error: "Failed to save user type" });
    }
};

// Get all user type details
const getalluserstypes = async (req, res) => {
    try {
        // Retrieve all user types from the database
        const aData = await userTypeSchema.find();

        // Respond with all user type data
        return res.status(200).json(aData);
    } catch (error) {
        console.error("Error fetching user types", error.message);
        
        // Log error message and return server error
        return res.status(500).json({ error: "Server error" });
    }
};
// Update user type by ID
//routes /updateUserTypeById/:id
const updateUserTypeById = async (req, res) => {
    const { UserTypeName, Description } = req.body;
    const id = req.params.id;
    try {
        // Define update object with new user type details
        const update = { UserTypeName, Description };
        
        // Find user type by ID and update with new details
        const updatedUserType = await userTypeSchema.findByIdAndUpdate(id, update, { new: true });
        
        // Check if user type exists
        if (!updatedUserType) {
            return res.status(404).json({ error: "User type not found" });
        }
        
        // Respond with updated user type details
        return res.status(200).json({message: "updated usertype successfully" ,updatedUserType});
    } catch (error) {
        console.error("Error updating user type", error.message);
        
        // Log error message and return server error
        return res.status(500).json({ error: "Server error" });
    }
};
// Delete user type by ID
//routes /deleteUserTypeById/:id
const deleteUserTypeById = async (req, res) => {
    try {
        // Find user type by ID and delete
        const deletedUserType = await userTypeSchema.findByIdAndDelete(req.params.id);
        
        // Check if user type exists
        if (!deletedUserType) {
            return res.status(404).json({ message: 'User type not found' });
        }
        
        // Respond with success message
        return res.status(200).json({ message: 'User type deleted successfully' });
    } catch (error) {
        console.error("Error deleting user type", error.message);
        
        // Log error message and return server error
        return res.status(500).json({ error: "Server error" });
    }
};




module.exports = {postuserType,getalluserstypes,updateUserTypeById,deleteUserTypeById};