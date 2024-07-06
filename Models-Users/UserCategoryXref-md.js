const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userCategoryXrefSchema = new Schema({
    UserId: { type: Schema.Types.ObjectId, ref: 'UserManagement', required: true },
    CategoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true }
});

module.exports = mongoose.model('UserCategoryXref', userCategoryXrefSchema);
