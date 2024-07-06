const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new Schema({
    CountryId: { type: Schema.Types.ObjectId, ref: 'Country', required: true },
    StateName: { type: String, required: true }
});

module.exports = mongoose.model('State', stateSchema);
