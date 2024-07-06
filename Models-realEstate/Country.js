const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countrySchema = new Schema({
    
    CountryId: { type: String, required: true },

    CountryName: { type: String, required: true }
});

module.exports = mongoose.model('Country', countrySchema);
