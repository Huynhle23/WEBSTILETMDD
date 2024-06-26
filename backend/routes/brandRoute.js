const express = require('express')
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware')
const { CreateBrand, getBrand, getAllBrand, updateBrand, deleteBrand } = require('../controllers/brandController')
const route = express.Router()

route.post('/create-brand',authMiddleware,isAdmin,CreateBrand)
route.get('/get-brand/:_id',getBrand)
route.get('/get-all-brand',getAllBrand)
route.put('/update-brand/:_id',authMiddleware,isAdmin,updateBrand)
route.delete('/delete-brand/:_id',authMiddleware,isAdmin,deleteBrand)


module.exports = route