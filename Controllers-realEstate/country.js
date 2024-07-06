const countrySchema = require("../Models-realEstate/Country");

/// Post country
const postCountry = async (req, res) => {
    const { CountryId, CountryName } = req.body;

    try {
        // Create a new instance of Country with request body
        const newCountry = new countrySchema({
            CountryId,
            CountryName
        });

        // Save the new country to the database
        await newCountry.save();
        //find the country if it exist
        const oData = await countrySchema.find();
        // Respond with success message and data
        return res.status(201).json({ message: "New country created successfully",oData});
    } catch (error) {
        console.error("Error saving country", error.message);
        
        // Return server error if save operation fails
        return res.status(500).json({ error: "Failed to save country" });
    }
};
// Get all countries
const getAllCountries = async (req, res) => {
    try {
        // Fetch all countries from the database
        const allCountries = await countrySchema.find();
        
        // Respond with all countries
        return res.json(allCountries);
    } catch (error) {
        console.error("Error fetching countries", error.message);
        
        // Return server error if fetch operation fails
        return res.status(500).json({ error: "Failed to fetch countries" });
    }
};
// Update country by ID
const updateCountry = async (req, res) => {
    const { CountryId, CountryName } = req.body;
    const id = req.params.id;

    try {
        // Define update object with new country details
        const update = {
            CountryId,
            CountryName
        };
        
        // Find country by ID and update with new details
        const updatedCountry = await countrySchema.findByIdAndUpdate(id, update, { new: true });
        
        // Check if country exists
        if (!updatedCountry) {
            return res.status(404).json({ error: "Country not found" });
        }
        
        // Respond with updated country details
        return res.json(updatedCountry);
    } catch (error) {
        console.error("Error updating country", error.message);
        
        // Return server error if update operation fails
        return res.status(500).json({ error: "Failed to update country" });
    }
};
// Delete country by ID
const deleteCountry = async (req, res) => {
    try {
        // Find country by ID and delete
        const deletedCountry = await countrySchema.findByIdAndDelete(req.params.id);
        
        // Check if country was found and deleted
        if (!deletedCountry) {
            return res.status(404).json({ message: 'Country not found' });
        }
        
        // Respond with success message
        return res.status(200).json({ message: 'Country deleted successfully' });
    } catch (error) {
        console.error("Error deleting country", error.message);
        
        // Return server error if delete operation fails
        return res.status(500).json({ error: "Failed to delete country" });
    }
};

module.exports ={postCountry,getAllCountries,updateCountry,deleteCountry};