const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bannerSchema = new Schema({
    BannerName: { type: String, required: true },
    BannerDescription: { type: String },
    //BannerImageUrl: { data: Buffer,contentType: String }
    //BannerImageUrl:{type:String, require:true}
    BannerImages: [{
        imagePath: { type: String, required: true },
        mimetype: { type: String, required: true }
      }]
});

module.exports = mongoose.model('Banner', bannerSchema);
