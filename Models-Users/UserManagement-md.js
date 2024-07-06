// userManagement.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userManagementSchema = new Schema({
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    PhoneNumber: { type: String, required: true, unique: true },
    Address: { type: String, required: true },
    Pincode: { type: String, required: true },
    UserType: { type: Schema.Types.ObjectId, ref: 'UserType', required: true }
});

module.exports = mongoose.model('UserManagement', userManagementSchema);


