  // tạo cloudinaly(utils) và uploadimg(middleware) trước
const asyncHandle = require('express-async-handler')
const {cloudinaryUploadImg,cloudinaryDeleteImg} = require('../utils/cloudinaly.js')

const uploadImages =asyncHandle(async(req,res)=>{
  try {
    const uploader = (path)=>cloudinaryUploadImg(path,'images')
    const urls =[]
    const files = req.files
    for(const file of files){
      const {path}= file
      const newPath = await uploader(path)
      urls.push(newPath)
    }

    const images = urls.map(file=>
    {
      return file
    },)
    res.json(images)
  } catch (error) {
    console.log(error)
        res.status(500).send({
            success : false,
            message : "upload product images error !"
        })
  }
})
const deleteImages =asyncHandle(async(req,res)=>{
  const {id}=req.params
  try {
    const deleteImg =cloudinaryDeleteImg(id,'images')
    res.json({message:"deleted"})
  } catch (error) {
    console.log(error)
        res.status(500).send({
            success : false,
            message : "upload product images error !"
        })
  }
})

module.exports = {
    uploadImages,
    deleteImages
}