const orderService = require('../order/service');
const bcrypt = require('bcryptjs');

const orderModel = require('../order/model');

exports.orderRes = async (name,price,image,quantity,user_id)=>{
    
    //const hash = await bcrypt.hash(password,await bcrypt.genSalt(10));
    order = await orderService.order(name,price,image,quantity,user_id);
    return {_id: order._id};
 }

 exports.getOrder = async () => {
    const order = await orderModel.find();
    
    return order;
}

exports.getOrderById = async (id) => {
    
      const order = await orderModel.findById(id);
      return order;
  };

  exports.getOrderId = async (id) => {
    const order = await orderModel.findById(id)
    return order;
   
  };

  exports.update = async (id, body) => {
    await orderModel.updateOne(id, {
       status:body.status,
    });
}

exports.update1 = async (id, body) => {
  await orderModel.updateOne(id, {
     notification:body,
  });
}

exports.delete = async (id) => {
  await orderModel.deleteOne(id);
}

// exports.postItemToCart = async payload => {
//     return order = await orderModel.create(payload);
// };