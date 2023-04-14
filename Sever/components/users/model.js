const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    id: { type: ObjectId },
    email: { type: String , require:true},
    password: { type: String, require:true },
    gender:{type: String},
    name:{type: String},
    address:{type: String},
    phone:{type: Number, default:""},
    image:{type: String, default:""},
    OTP: {
        type: String,
        default: ""
    },
});

module.exports = mongoose.model('user', userSchema);