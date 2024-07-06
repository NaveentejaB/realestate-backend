const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    CategoryName: { type: String, required: true },
    CategoryDescription: { type: String }
});

module.exports = mongoose.model('Category', categorySchema);
