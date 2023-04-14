const categoryModel = require('../category/model')

exports.getCategories = async () => {
    const categories = await categoryModel.find();
    return categories;
}

exports.getCategoryById = async (id) => {
    const category = await categoryModel.findById(id);
    return category;
}

exports.insert = async (body) => {
    console.log(body)
    const category = new categoryModel({
        name: body.category_name,
    })
    await category.save()
}

exports.update = async (id, body) => {
    await categoryModel.updateOne(id, {
        name: body.category_name,
    })
}

exports.delete = async (id) => {
    await categoryModel.deleteOne(id)
}

