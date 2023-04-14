var express = require('express');
var router = express.Router();

const userController = require('../components/users/controller');
const profileController = require('../components/profile/controller');

const productController = require('../components/products/controller');
const paymethodController = require('../components/paymethod/controller');
const jwt = require('jsonwebtoken');
const signup = require('../middle/signup');
const orderController = require('../components/order/controller');
const productModel = require('../components/products/model')
const undoorderController = require('../components/undoorder/controller');
const { order } = require('../components/order/service');

/**
 * page: register
 * http://localhost:3000/api/register
 * method: post
 */
router.post('/register', async function (req, res, next) {
  
  const { email, password, confirm_password,name,gender,address,phone } = req.body;
 
  const result = await userController.register(email, password,confirm_password,name,gender,address,phone)
  console.log(email, password, confirm_password);
  if (result) {
    res.json({status: true});
  } else {
    res.json({status: false});
  }
});

router.post('/order', async function (req, res, next) {
  
  const { name, price, image,quantity } = req.body;
 
  const result = await orderController.orderRes( name, price, image,quantity );
  
  if (result) {
    res.json({status: true});
  } else {
    res.json({status: false});
  }
});

router.post('/undoorder', async function (req, res, next) {
  const {id}=req.body;
  const {notification} = req.body;
  console.log(id);
  const result = await orderController.update1({_id:id}, notification);
  if (result) {
    res.json({status: true});
  } else {
    res.json({status: false});
  }
});
/**
 * page: register
 * http://localhost:3000/api/login
 * method: get
 */
router.post('/login', async function (req, res, next) {
  
  const { email, password } = req.body;
 
  const result = await userController.login(email,password);
  
 
  if (result) {
    
    res.json({status: true/*,result,token*/})
  } else {
    res.json({status: false})
  }
});

router.post('/reset', async function (req,res,next){
  const password = await userController.update();
  
})

/**
 * page: product
 * http://localhost:3000/api/products
 * method: get
 * detail:
 * author:
 * date:
 */
router.get('/products', async function (req, res, next) {
  //lay danh sach san pham
  const products = await productController.getProducts();
 // console.log(products);

  res.json(products);
});

router.get('/orders', async function (req, res, next) {
  //lay danh sach san pham
  const order = await orderController.getOrder();
 // console.log(order);

  res.json(order);
});

router.get('/products/:id/detail', async function (req, res, next) {

  const {id} = req.params;
  //lay danh sach san pham
  const product = await productController.getProductById(id);
  res.json(product);
});
router.get('/profile/:id/detail', async function (req, res, next) {

  const {id} = req.params;
  //lay danh sach san pham
  const profile = await userController.getProfileById(id);
  res.json(profile);
});

router.get('/orders/:id/detail', async function (req, res, next) {

  const {id} = req.params;
  //lay danh sach san pham
  const orders = await orderController.getOrderById(id);
  res.json(orders);
});



router.post('/order/:id/delete', async function (req, res, next) {
  await orderController.delete({_id: req.params.id})
  res.redirect('back')
});

router.get('/profile', async function (req, res, next) {
  const user = await userController.getProfileById();
  console.log(user);

  res.json(user);
});
router.get('/insertprofile', async function (req, res, next) {
  //lay danh sach san pham
  const profile = await profileController.insert();
  console.log(profile);

  res.json(profile);
});

router.get('/paymethod', async function (req, res, next) {
  //lay danh sach san pham
  const paymethod = await paymethodController.getPaymethod();
  console.log(paymethod);

  res.json(paymethod);
});

router.get('/insertpaymethod', async function (req, res, next) {
  //lay danh sach san pham
  const paymethod = await paymethodController.insert();
  console.log(paymethod);

  res.json(paymethod);
});

router.get("/search/:key", async (req, res, next) => {
  let products = await productModel
    .find({
      "$or": [
        { "name": { $regex: req.params.key } }
      ]
    })
  res.json(products);
  });
module.exports = router;
