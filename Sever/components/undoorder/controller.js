const undoorderService = require('../undoorder/service')
const bcrypt = require('bcryptjs');

const undoorderModel = require('../undoorder/model');
exports.undoorderRes = async (name,price,image,quantity,createdAt, order_id)=>{
    
    //const hash = await bcrypt.hash(password,await bcrypt.genSalt(10));
    undoorder = await undoorderService.undoorder(name,price,image,quantity,createdAt, order_id);
    return {_id: undoorder._id};
 }

 exports.getUndoOrder = async () => {
    const undoorder = await undoorderModel.find();
    return undoorder;
}

exports.getUndoOrderById = async (id) => {
    const undoorder = await undoorderModel.findById(id)
    return undoorder;
}