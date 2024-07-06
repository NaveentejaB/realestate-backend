const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
    StateId: { type: Schema.Types.ObjectId, ref: 'State', required: true },
    CityName: { type: String, required: true }
});

module.exports = mongoose.model('City', citySchema);
