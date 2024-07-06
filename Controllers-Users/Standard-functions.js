
const getAllDocuments = (model) => async (req, res) => {
    try {
        // Fetch all documents from the specified model
        const allDocuments = await model.find();
        
        // Respond with all documents
        return res.json(allDocuments);
    } catch (error) {
        console.error(`Error fetching documents from ${model.modelName}`, error.message);
        
        // Return server error if fetch operation fails
        return res.status(500).json({ error: `Failed to fetch documents from ${model.modelName}` });
    }
};

const createDocument = (model) => async (req, res) => {
    try {
        // Extract data from request body
        const newData = req.body;

        // Create new document using Mongoose model
        const createdDocument = await model.create(newData);

        // Respond with success message and created document
        return res.status(201).json({ message: "Document created successfully", data: createdDocument });
    } catch (error) {
        console.error(`Error creating document in ${model.modelName}`, error.message);

        // Return server error if create operation fails
        return res.status(500).json({ error: `Failed to create document in ${model.modelName}` });
    }
};

const updateDocument = (model) => async (req, res) => {
    try {
        const { id } = req.params; // Extract document ID from URL params
        const updatedData = req.body; // Extract updated data from request body

        // Find document by ID and update it
        const updatedDocument = await model.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedDocument) {
            return res.status(404).json({ error: `Document not found with ID ${id}` });
        }

        // Respond with success message and updated document
        return res.json({ message: "Document updated successfully", data: updatedDocument });
    } catch (error) {
        console.error(`Error updating document in ${model.modelName}`, error.message);

        // Return server error if update operation fails
        return res.status(500).json({ error: `Failed to update document in ${model.modelName}` });
    }
};

const deleteDocument = (model) => async (req, res) => {
    try {
        const { id } = req.params; // Extract document ID from URL params

        // Find document by ID and delete it
        const deletedDocument = await model.findByIdAndDelete(id);

        if (!deletedDocument) {
            return res.status(404).json({ error: `Document not found with ID ${id}` });
        }

        // Respond with success message and deleted document
        return res.json({ message: "Document deleted successfully", data: deletedDocument });
    } catch (error) {
        console.error(`Error deleting document in ${model.modelName}`, error.message);

        // Return server error if delete operation fails
        return res.status(500).json({ error: `Failed to delete document in ${model.modelName}` });
    }
};



module.exports = { getAllDocuments,createDocument,updateDocument,deleteDocument };