const realEstatePropertySchema = require("../Models-realEstate/RealEstateProperty");

// Post real estate property details
const postRealEstateProperty = async (req, res) => {
    const { UserId,PropertyName, PropertyDescription,AddressLine1,AddressLine2, CityId,StateId,Country,Latitude,Longitude, ZipCode
       } = req.body;
    
    try {
        // Create a new instance of RealEstateProperty with request body
        const newProperty = new realEstatePropertySchema({UserId,PropertyName,PropertyDescription,AddressLine1,AddressLine2,CityId,StateId,
            Country,
            Latitude,
            Longitude,
            ZipCode
        });

        // Save the new real estate property to the database
        await newProperty.save();

        // Fetch all real estate properties after saving
        const data = await realEstatePropertySchema.find();

        // Respond with success message and data
        return res.status(201).json({ message: "New real estate property saved successfully", data });
    } catch (error) {
        console.error("Error saving real estate property", error.message);
        
        // Return server error if save operation fails
        return res.status(500).json({ error: "Failed to save real estate property" });
    }
};
// Get all real estate properties
const getAllRealEstateProperties = async (req, res) => {
    try {
        // Fetch all real estate properties from the database
        const allProperties = await realEstatePropertySchema.find();
        
        // Respond with all real estate properties
        return res.json(allProperties);
    } catch (error) {
        console.error("Error fetching real estate properties", error.message);
        
        // Return server error if fetch operation fails
        return res.status(500).json({ error: "Failed to fetch real estate properties" });
    }
};
// Update real estate property by ID
const updateRealEstateProperty = async (req, res) => {
    const { UserId,PropertyName,PropertyDescription,AddressLine1,AddressLine2,CityId, StateId,Country,Latitude,Longitude,ZipCode
    } = req.body;
    
    const id = req.params.id;

    try {
        // Define update object with new real estate property details
        const update = {UserId, PropertyName,PropertyDescription,AddressLine1,AddressLine2,CityId,StateId,Country,
            Latitude,
            Longitude,
            ZipCode
        };
        
        // Find real estate property by ID and update with new details
        const updatedProperty = await realEstatePropertySchema.findByIdAndUpdate(id, update, { new: true });
        
        // Check if real estate property exists
        if (!updatedProperty) {
            return res.status(404).json({ error: "Real estate property not found" });
        }
        
        // Respond with updated real estate property details
        return res.statu(200).json({message:"updated real estate property sucessfully",updatedProperty});
    } catch (error) {
        console.error("Error updating real estate property", error.message);
        
        // Return server error if update operation fails
        return res.status(500).json({ error: "Failed to update real estate property" });
    }
};
// Delete real estate property by ID
const deleteRealEstateProperty = async (req, res) => {
    try {
        // Find real estate property by ID and delete
        const deletedProperty = await realEstatePropertySchema.findByIdAndDelete(req.params.id);
        
        // Check if real estate property was found and deleted
        if (!deletedProperty) {
            return res.status(404).json({ message: 'Real estate property not found' });
        }
        
        // Respond with success message
        return res.statu(200).json({ message: 'Real estate property deleted successfully' });
    } catch (error) {
        console.error("Error deleting real estate property", error.message);
        
        // Return server error if delete operation fails
        return res.status(500).json({ error: "Failed to delete real estate property" });
    }
};


module.exports= {postRealEstateProperty,getAllRealEstateProperties,updateRealEstateProperty,deleteRealEstateProperty};