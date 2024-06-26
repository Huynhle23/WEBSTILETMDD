const express = require('express')
const { uploadImages, deleteImages } = 
    require('../controllers/uploadController')
const { isAdmin,authMiddleware} = require('../middlewares/authMiddleware')
const { uploadPhoto, productImgResize,  } = require('../middlewares/uploadImg')
const route = express.Router()


route.post('/upload',authMiddleware,isAdmin,uploadPhoto.array('images',10),productImgResize,uploadImages)

route.delete('/delete-image/:id',authMiddleware,isAdmin,deleteImages)

module.exports = route