const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const orderSchema = new Schema({
    id: { type: ObjectId},
    name: { type: String },
    price: { type: Number},
    image: { type: String },
    quantity: { type : Number},
    status:{type: String, default:"Order is being processed"},
    notification:{type: String, default: ""},
     user_id: { type: Schema.Types.ObjectId, ref: 'user'},
     undoorder_id: { type: Schema.Types.ObjectId, ref: 'undoorder'},
}, { timestamps: true })

module.exports = mongoose.model('order', orderSchema);