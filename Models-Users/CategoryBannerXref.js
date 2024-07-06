const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoryBannerXrefSchema = new Schema({
    CategoryId: { type: Schema.Types.ObjectId, 
        ref: 'Category', required: true },
    BannerId: { type: Schema.Types.ObjectId, 
        ref: 'Banner', required: true }
});

module.exports = mongoose.model('CategoryBannerXref', categoryBannerXrefSchema);
