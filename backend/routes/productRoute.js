const express = require('express')
const { createProduct, getaProduct, getAllProduct, updateProduct, 
    deleteProduct, addToWishlist, rating,searchProductController } = 
    require('../controllers/productController')
const { isAdmin,authMiddleware} = require('../middlewares/authMiddleware')
const { uploadPhoto, productImgResize,  } = require('../middlewares/uploadImg')
const { saveAddress } = require('../controllers/userController')
const route = express.Router()

route.post('/create-product',authMiddleware,isAdmin,createProduct)
route.get('/get-product/:id',getaProduct)
route.get('/getall-product',getAllProduct)
route.put('/rating',authMiddleware,rating)
route.get('/search/:keyword',searchProductController)
// upload ảnh 
route.put('/wishlist',authMiddleware,addToWishlist)

route.put('/update-product/:_id',authMiddleware,isAdmin,updateProduct)
route.delete('/delete-product/:_id',authMiddleware,isAdmin,deleteProduct)

module.exports = route