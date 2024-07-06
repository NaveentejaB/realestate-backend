// userType.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userTypeSchema = new Schema({
    UserTypeName: { type: String, required: true },
    Description: { type: String }
});

module.exports = mongoose.model('UserType', userTypeSchema);
