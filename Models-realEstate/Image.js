const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imagesSchema = new Schema({
    ImageUrl: { type: String, required: true },
    Description: { type: String },
    Default: { type: Boolean, default: false },
    PropertyId: { type: Schema.Types.ObjectId, ref: 'RealEstateProperty', required: true },
    UserId: { type: Schema.Types.ObjectId, ref: 'UserManagement', required: true }
});

module.exports = mongoose.model('Images', imagesSchema);
