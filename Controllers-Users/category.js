const categorySchema = require("../Models-Users/Category");


// Post category
const postcategory = async (req, res) => {
    const { CategoryName, CategoryDescription } = req.body;
    try {
        // Create a new instance of categorySchema with request body
        const newCategory = new categorySchema({
            CategoryName,
            CategoryDescription
        });
        
        // Save the new category to the database
        await newCategory.save();
        
        // Retrieve all categories from the database after saving
        const oData = await categorySchema.find();
        
        // Respond with success message and updated data
        return res.status(201).json({ message: "New category saved successfully", oData });
    } catch (error) {
        console.error("Error saving category", error.message);
        
        // Return server error if save operation fails
        return res.status(500).json({ error: "Failed to save category" });
    }
};

/// Get all categories
const getAllCategories = async (req, res) => {
    try {
        // Retrieve all categories from the database
        const aAllCategories = await categorySchema.find();
        
        // Respond with all category data
        return res.status(200).json(aAllCategories);
    } catch (error) {
        console.error("Error fetching categories", error.message);
        
        // Log error message and return server error
        return res.status(500).json({ error: "Failed to fetch categories" });
    }
};

// Update category by ID
const updateCategory = async (req, res) => {
    const { CategoryName, CategoryDescription } = req.body;
    const id = req.params.id;
    try {
        // Define update object with new category details
        const Update = { CategoryName, CategoryDescription };
        
        // Find category by ID and update with new details
        const oUpdatedCategory = await categorySchema.findByIdAndUpdate(id, Update, { new: true });
        
        // Check if category exists
        if (!oUpdatedCategory) {
            return res.status(404).json({ error: "Category not found" });
        }
        
        // Respond with updated category details
        return res.status(200).json({message:"category updated successfully ",oUpdatedCategory});
    } catch (error) {
        console.error("Error updating category", error.message);
        
        //  error message and return server error
        return res.status(500).json({ error: "Failed to update category" });
    }
};

// Get category by name
const getCategoryByName = async (req, res) => {
    const categoryName = req.params.categoryName;

    try {
        // Find category by CategoryName
        const oCategory = await categorySchema.findOne({ CategoryName: categoryName });

        // Check if category exists
        if (!oCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Respond with category details
        return res.json(oCategory);
    } catch (error) {
        console.error("Error finding category by name", error.message);
        
        //  error message and return server error
        return res.status(500).json({ error: "Server error" });
    }
};

// Delete category by ID
const deleteCategory = async (req, res) => {
    try {
        // Find category by ID and delete
        const deletedCategory = await categorySchema.findByIdAndDelete(req.params.id);
        
        // Check if category exists
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        
        // Respond with success message
        return res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error("Error deleting category", error.message);
        
        // error message and return server error
        return res.status(500).json({ error: "Failed to delete category" });
    }
};

module.exports = { postcategory, getAllCategories, updateCategory, getCategoryByName, deleteCategory };


