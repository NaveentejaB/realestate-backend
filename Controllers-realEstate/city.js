const citySchema = require("../Models-realEstate/City");

// Post city details
const postCity = async (req, res) => {
    const { StateId, CityName } = req.body;

    try {
        // Create a new instance of City with request body
        const newCity = new citySchema({
            StateId,
            CityName
        });

        // Save the new city to the database
        await newCity.save();
        //fetching the city is exist
         const oData = await citySchema.find();
        // Respond with success message and data
        return res.status(201).json({ message: "New city created successfully", oData});
    } catch (error) {
        console.error("Error saving city", error.message);
        
        // Return server error if save operation fails
        return res.status(500).json({ error: "Failed to save city" });
    }
};
// Get all cities
const getAllCities = async (req, res) => {
    try {
        // Fetch all cities from the database
        const allCities = await citySchema.find();
        
        // Respond with all cities
        return res.json(allCities);
    } catch (error) {
        console.error("Error fetching cities", error.message);
        
        // Return server error if fetch operation fails
        return res.status(500).json({ error: "Failed to fetch cities" });
    }
};
// Update city by ID
const updateCity = async (req, res) => {
    const { StateId, CityName } = req.body;
    const id = req.params.id;

    try {
        // Define update object with new city details
        const update = {
            StateId,
            CityName
        };
        
        // Find city by ID and update with new details
        const updatedCity = await citySchema.findByIdAndUpdate(id, update, { new: true });
        
        // Check if city exists
        if (!updatedCity) {
            return res.status(404).json({ error: "City not found" });
        }
        
        // Respond with updated city details
        return res.status(200).json({message:"updated city details sucessfully",updatedCity});
    } catch (error) {
        console.error("Error updating city", error.message);
        
        // Return server error if update operation fails
        return res.status(500).json({ error: "Failed to update city" });
    }
};
// Delete city by ID
const deleteCity = async (req, res) => {
    try {
        // Find city by ID and delete
        const deletedCity = await citySchema.findByIdAndDelete(req.params.id);
        
        // Check if city was found and deleted
        if (!deletedCity) {
            return res.status(404).json({ message: 'City not found' });
        }
        
        // Respond with success message
        return res.status(200).json({ message: 'City deleted successfully' });
    } catch (error) {
        console.error("Error deleting city", error.message);
        
        // Return server error if delete operation fails
        return res.status(500).json({ error: "Failed to delete city" });
    }
};


module.exports ={postCity,getAllCities,updateCity,deleteCity};