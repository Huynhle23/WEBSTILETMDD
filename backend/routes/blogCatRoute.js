const express = require('express')
const { CreateBlogCategory,deleteBlogCategory,getAllBlogCategory,getBlogCategory,updateBlogCategory } = require('../controllers/blogCatController')
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware')
const route = express.Router()

route.post('/create-blogcategory',authMiddleware,isAdmin,CreateBlogCategory)
route.get('/get-blogcategory/:_id',getBlogCategory)
route.get('/get-all-blogcategory',getAllBlogCategory)
route.put('/update-blogcategory/:_id',authMiddleware,isAdmin,updateBlogCategory)
route.delete('/delete-blogcategory/:_id',authMiddleware,isAdmin,deleteBlogCategory)


module.exports = route