const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const undoorderSchema = new Schema({
    id: { type: ObjectId},
    name: { type: String },
    price: { type: Number},
    image: { type: String },
    quantity: { type : Number},
    status:{type: String, default:"This order is required cancel!"},
     user_id: { type: Schema.Types.ObjectId, ref: 'user'},
     order_id: { type: Schema.Types.ObjectId, ref: 'order'},
}, { timestamps: true })

module.exports = mongoose.model('undoorder', undoorderSchema);