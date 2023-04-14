const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    customer: {
        type: String,
    },
    address: {
        type: String
    },
    phone: {
        type: Number
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
});

module.exports = mongoose.model('address', addressSchema);
