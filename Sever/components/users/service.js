const userModel = require('./model');


// tầng gọi database
exports.login = async (email,password) => {
    // const user = data.filter(i => i.email == email)[0];
    // return user;
    const user = await userModel.findOne({ email: email, password: password},
       'id email password' );
       return user;
}


exports.register  = async (email,password,name,gender,address,phone) =>{
    const user = new userModel({email: email, password: password,name: name, gender:gender, address: address, phone: phone });

    return await user.save();
}

exports.register = async (userBody) => {
    const user = await userModel.findOne({ email: userBody.email })
    if (user){
        throw new Error('Email đã tồn tại');
    }
    return await userModel.create(userBody);
}

exports.findById = async (id) => {
    const data = await userModel.findById(id);
    return data;
}


// mảng dữ liệu users
// lấy từ database
// var data = [
//     {id: 1, email: 'letrieuuy16121998@gmail.com', password: '1612998', name: 'Uy'}
// ]

