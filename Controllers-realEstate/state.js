const stateSchema = require("../Models-realEstate/State");

// Post state details
const postState = async (req, res) => {
    const { CountryId, StateName } = req.body;

    try {
        // Create a new instance of State with request body
        const newState = new stateSchema({
            CountryId,
            StateName
        });

        // Save the new state to the database
        await newState.save();
        //find the sate data is saved
        const oData = await stateSchema.find();
        // Respond with success message and data
        return res.status(201).json({ message: "New state created successfully", oData});
    } catch (error) {
        console.error("Error saving state", error.message);
        
        // Return server error if save operation fails
        return res.status(500).json({ error: "Failed to save state" });
    }
};
// Get all states
const getAllStates = async (req, res) => {
    try {
        // Fetch all states from the database
        const allStates = await stateSchema.find();
        
        // Respond with all states
        return res.json(allStates);
    } catch (error) {
        console.error("Error fetching states", error.message);
        
        // Return server error if fetch operation fails
        return res.status(500).json({ error: "Failed to fetch states" });
    }
};
// Update state by ID
const updateState = async (req, res) => {
    const { CountryId, StateName } = req.body;
    const id = req.params.id;

    try {
        // Define update object with new state details
        const update = {
            CountryId,
            StateName
        };
        
        // Find state by ID and update with new details
        const updatedState = await stateSchema.findByIdAndUpdate(id, update, { new: true });
        
        // Check if state exists
        if (!updatedState) {
            return res.status(404).json({ error: "State not found" });
        }
        
        // Respond with updated state details
        return res.json(updatedState);
    } catch (error) {
        console.error("Error updating state", error.message);
        
        // Return server error if update operation fails
        return res.status(500).json({ error: "Failed to update state" });
    }
};
// Delete state by ID
const deleteState = async (req, res) => {
    try {
        // Find state by ID and delete
        const deletedState = await stateSchema.findByIdAndDelete(req.params.id);
        
        // Check if state was found and deleted
        if (!deletedState) {
            return res.status(404).json({ message: 'State not found' });
        }
        
        // Respond with success message
        return res.status(200).json({ message: 'State deleted successfully' });
    } catch (error) {
        console.error("Error deleting state", error.message);
        
        // Return server error if delete operation fails
        return res.status(500).json({ error: "Failed to delete state" });
    }
};


module.exports={postState,getAllStates,updateState,deleteState};