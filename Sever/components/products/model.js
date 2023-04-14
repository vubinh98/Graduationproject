const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productSchema = new Schema({
    id: { type: ObjectId},
    name: { type: String },
    price: { type: Number},
    image: { type: String },
    quantity: { type : String},
    category_id: { type: Schema.Types.ObjectId, ref: 'category'}
}, { timestamps: true })

module.exports = mongoose.model('product', productSchema);