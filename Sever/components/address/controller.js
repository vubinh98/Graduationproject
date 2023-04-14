const addressService = require('./service');

exports.create = async (body) => {
    return await addressService.createAddress(body);
}

exports.getByUser = async (id) => {
    return await addressService.getByUser(id);
}

exports.delete = async (id) => {
    return await addressService.delete(id);
}

exports.update = async (id, body) => {
    return await addressService.update(id, body);
}