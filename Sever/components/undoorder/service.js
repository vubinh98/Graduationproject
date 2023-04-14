const { order } = require('../order/service');
const undoorderModel = require('../undoorder/model')

exports.undoorder  = async (name,price,image,quantity,createdAt,order_id) =>{
    const order = new undoorderModel({ name: name, price: price,image: image, quantity: quantity, createdAt: createdAt, order_id:order_id});
    return await order.save();
}