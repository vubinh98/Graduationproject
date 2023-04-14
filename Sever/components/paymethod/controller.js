const paymethodModel = require('../paymethod/model');

exports.getPaymethod = async () => {
    const paymethod = await paymethodModel.find();
    return paymethod;
}

exports.getCategoryById = async (id) => {
    const paymethods = await paymethodModel.findById(id);
    return paymethods;
}

exports.insert = async (body) => {
    console.log(body)
    const paymethod = new paymethodModel({
        name: body.paymethod,
    })
    await paymethod.save()
}

exports.update = async (id, body) => {
    await paymethodModel.updateOne(id, {
        creditcard: body.paymethod_creditcard,
        momo: body.paymethod_momo,
        cod: body.paymethod_momo,
        
    });
}

exports.delete = async (id) => {
    await paymethodModel.deleteOne(id)
}

