const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const realEstatePropertySchema = new Schema({
    UserId: { type: Schema.Types.ObjectId, ref: 'UserManagement', required: true },
    PropertyName: { type: String, required: true },
    PropertyDescription: { type: String },
    AddressLine1: { type: String, required: true },
    AddressLine2: { type: String },
    CityId: { type: Schema.Types.ObjectId, ref: 'City' },
    StateId: { type: Schema.Types.ObjectId, ref: 'State' },
    Country: { type: String, required: true },
    Latitude: { type: Number },
    Longitude: { type: Number },
    ZipCode: { type: String }
});

module.exports = mongoose.model('RealEstateProperty', realEstatePropertySchema);
