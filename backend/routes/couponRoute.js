const express =require('express')
const { createCoupon, getAllCoupons, updateCoupon, deleteCoupon, getACoupon } = require('../controllers/couponController')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')
const route = express.Router()
// 6:32
route.post('/create-coupon',authMiddleware,isAdmin,createCoupon)
route.get('/get-all-coupon',authMiddleware,isAdmin,getAllCoupons)
route.get('/get-coupon/:_id',authMiddleware,isAdmin,getACoupon)
route.put('/update-coupon/:_id',authMiddleware,isAdmin,updateCoupon)
route.delete('/delete-coupon/:_id',authMiddleware,isAdmin,deleteCoupon)

module.exports = route