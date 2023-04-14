const express = require('express')
const router = express.Router();

const categoryController = require('../components/category/controller');

router.get('/insert', async function (req, res, next){
    res.render('categoryInsert')
})

router.post('/store', async function (req, res, next){
    await categoryController.insert(req.body);
    res.redirect('/products')
})

router.get('/:id/edit', async function (req, res, next){
    const categories = await categoryController.getCategoryById(req.params.id);
    res.render('categoryEdit', {categories: categories});
})

router.post('/:id', async function (req, res, next) {
    await categoryController.update({_id: req.params.id}, req.body)
    res.redirect('/categories')
})


router.delete('/:id', async function (req, res, next) {
    await categoryController.delete({_id: req.params.id})
    res.redirect('back')
})

router.get('/', async function (req, res){
    const categories = await categoryController.getCategories();
    res.render('categories', {categories: categories})
})
router.post('/:id/delete', async function (req, res, next) {
    await categoryController.delete({_id: req.params.id})
    res.redirect('back')
})
router.post('/:id/edit',async function (req, res, next) {
    // xử lý cập nhật một sản phẩm
    let { params, file, body } = req;
    delete body.image;
  
    if (file) {
      let image = `https://192.168.1.189:3000/images/${file.filename}`;
      body = {...body, image}; 
    }
    
    await categoryController.update(params.id, body);
    res.redirect('/categories');
  });
module.exports = router;
