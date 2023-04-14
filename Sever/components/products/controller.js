const productModel = require('../products/model');

exports.getProducts = async () => {
    const products = await productModel.find().populate('category_id').select("_id name price quantity image")
    return products
}

exports.getProductById = async (id) => {
    const product = await productModel.findById(id)
    return product;
}

exports.insert = async (body) => {
    const product = productModel({
        name: body.product_name,
        price: body.product_price,
        image: body.product_image,
        quantity: body.product_quantity,
        category_id: body.category_id,
    });
    await product.save();
}

exports.update = async (id, body) => {
    await productModel.updateOne(id, {
        name: body.product_name,
        price: body.product_price,
        image: body.product_image,
        quantity: body.product_quantity,
        category_id: body.category_id,
    });
}

exports.delete = async (id) => {
    await productModel.deleteOne(id);
}
exports.findByName = async (name) => {
    return await productService.findByName(name);
}