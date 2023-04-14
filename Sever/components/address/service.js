const addressModel = require('./model');

exports.createAddress = async (address) => {
    await addressModel.create(address);
}

exports.getByUser = async (id) => {
    return await addressModel.find({ 'user_id': id });
}

exports.delete = async (id) => {
    return await addressModel.findByIdAndDelete(id);
}

exports.update = async (id, address) => {
    return await addressModel.findByIdAndUpdate(id, address)
}