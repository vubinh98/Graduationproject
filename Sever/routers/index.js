var express = require('express');
var router = express.Router();

router.get("/", function (req, res) {
    res.render("login");
})

router.post("/", function(req, res){
    res.redirect("/products")
})



module.exports = router;