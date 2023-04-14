const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const profileSchema = new Schema({
    id: { type: ObjectId},
    name: { type: String }, 
    gender:{type:String},
    birthday:{ type: Date},
    address:{type: String},
    phone:{type: Number},
    user_id: { type: Schema.Types.ObjectId, ref: 'user'}


});


module.exports = mongoose.model('profile', profileSchema);