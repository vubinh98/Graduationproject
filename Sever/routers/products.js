const express = require('express')
const router = express.Router();
//const a  =require('./public/images');
const productController = require('../components/products/controller');
const categoryController = require('../components/category/controller');
const orderController = require('../components/order/controller');
const underorderController = require('../components/undoorder/controller');
const upload = require('../middle/upload');
const signup = require('../middle/signup');

router.get('/insert', async function (req, res, next){
    const categories = await categoryController.getCategories();
    res.render('productInsert', {category: categories})
})


router.post('/store', async function (req, res, next){
    await productController.insert(req.body);
    res.redirect('/products')
})

router.get('/:id/edit', async function (req, res, next){
    const product = await productController.getProductById(req.params.id)
    const categories = await categoryController.getCategories();
    res.render('productEdit', {product: product, categories: categories});
})    



router.get('/order/:id/edit', async function (req, res, next){
  const order = await orderController.getOrderId(req.params.id)
  res.render('orderEdit', {order: order });
})

router.post('/order/:id', async function (req, res, next) {
  await orderController.update({_id: req.params.id}, req.body)
  res.redirect('/products/order')
})
router.post('/undoorrder/:id', async function (req, res, next) {
  await underorderController.update({_id: req.params.id}, req.body)
  res.redirect('/products/order')
})

router.post('/:id', async function (req, res, next) {
    await productController.update({_id: req.params.id}, req.body)
    res.redirect('/products')
})  




router.post('/:id/delete', async function (req, res, next) {
    await productController.delete({_id: req.params.id})
    res.redirect('back')
})

router.get('/', async function (req, res){
    const products = await productController.getProducts();
    res.render('products', {product: products})
})

router.get('/statistical', async function (req, res){
  res.render('statistical')
})
router.get('/order', async function (req, res){
    const order = await orderController.getOrder();
    const undoorder = await underorderController.getUndoOrder();
    res.render('order', {order: order, undoorder: undoorder});
})

router.post('/order/:id/delete', async function (req, res, next) {
  await orderController.delete({_id: req.params.id})
  res.redirect('back')
})

router.post('/', [upload.single('image')], async function (req, res, next) {
    // xử lý thêm mới sản phẩm
    let { body, file } = req;
    let image = '';
    if (file) {
      image = `https://192.168.1.189:3000/images/${file.filename}`;    
    }
    body = {...body, image};
    await productController.insert(body);
    res.redirect('/products');
  });

  
  router.post('/:id/edit', [upload.single('image')],async function (req, res, next) {
    // xử lý cập nhật một sản phẩm
    let { params, file, body } = req;
    delete body.image;
  
    if (file) {
      let image = `https://192.168.1.189:3000/images/${file.filename}`;
      body = {...body, image}; 
    }
    
    await productController.update(params.id, body);
    res.redirect('/products');
  });
  
  router.get('/find/:name', async (req, res) => {
    const { name } = req.params;
    const products = await productController.findByName(name);
    let data = [];
    for(var product of products) {
        if(product.quatity == true){
            data.push(product);
        }
    }
    if(data){
        return res.json(data);
    }else{
        res.status(404).json({message: "No products found"});
    }
});

module.exports = router;
