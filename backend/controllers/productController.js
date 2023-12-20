const ProductModel = require('../models/productModel.js')
const asyncHandle = require('express-async-handler')
const slugify = require('slugify')
const userModel = require('../models/userModel.js')


// create new product
const createProduct = asyncHandle(async(req,res)=>{
    try {
        // 2:32
        if(req.body.title){
            req.body.slug = slugify(req.body.title)
        }
        const newProduct = await ProductModel.create(req.body)
        res.status(200).send({
            success : true,
            message : "create product success !",
            newProduct
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "create product error !"
        })
    }
})


// update product
const updateProduct = asyncHandle(async (req, res) => {
    const {_id} = req.params;
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title);
      }
      const updateProduct = await ProductModel.findOneAndUpdate({ _id }, req.body, {
        new: true,
      })
      res.status(200).send({
        success : true,
        message : "update product success !"
    })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "update product error !"
        })
    }
  });
  // delete product
const deleteProduct = asyncHandle(async (req, res) => {
    const {_id} = req.params;
    try {
      const deleteProduct = await ProductModel.findOneAndDelete({_id})
      res.status(200).send({
        success : false,
        message : "delete product success !",
        deleteProduct
    })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "delete product error !"
        })
    }
});

// get a product
const getaProduct = asyncHandle(async(req,res)=>{
    const {_id}= req.params
    try {
        const findProduct = await ProductModel.findById(_id)
        res.status(200).send({
            success : true,
            message : "get a product error !",
            findProduct
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "get a product error !"
        })
    }
})

// get all product
const getAllProduct = asyncHandle(async(req,res)=>{
    try {

        // filtering 
        const queryObj = {...req.query} //truy vấn của yêu cầu (req.query) bằng cách sử dụng toán tử spread (...)
        // Một mảng excludeFields được định nghĩa để loại bỏ các trường cụ thể khỏi các tham số truy vấn (page, sort, limit, fields).
        const excludeFiedls = ['page','sort','limit','fields'] // cho ban đầu 
        excludeFiedls.forEach(el =>delete queryObj[el]) // nếu có cái nào trùng với queryObj thì xóa đi

        let queryStr = JSON.stringify(queryObj)
        // Các tham số truy vấn còn lại được chuyển đổi thành một chuỗi JSON 
        // (queryStr) và sau đó được biến đổi bằng một biểu thức chính quy để thay thế một 
        // số toán tử so sánh cụ thể (gte, gt, lte, lt) bằng các giá trị tương ứng của MongoDB ($gte, $gt, $lte, $lt).
        // replace sử dụng để thay thế một chuỗi con cụ thể bằng một chuỗi mới
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) =>`$${match}`) 
        // Nếu match là "gte", thì chuỗi mới sẽ là "$gte".
        // Nếu match là "gt", thì chuỗi mới sẽ là "$gt".


        let query = ProductModel.find(JSON.parse(queryStr)) // tìm kiếm các từ khóa được trả về


        // sorting
        if(req.query.sort){
            const sortBy = req.query.sort.split(",").join(" ")
            query=query.sort(sortBy) // lấy hết những gì query.sort có
        }else{
            query = query.sort("-createdAt")
        }
        // liming the fields
        if(req.query.fields){ // truy vấn tất cả những gì mà người search trên url http://localhost:5000/api/product/getall-product?fields=title,price,category
            const fields = req.query.fields.split(",").join(" ")
            query=query.select(fields) // lấy hết những gì query.sort có
        }else{
            query = query.select("-__v")
        }

        // pagination
        const page = req.query.page
        const limit = req.query.limit
        const skip = (page - 1) * limit
        query = query.skip(skip).limit(limit)
        if(req.query.page){
            const productCount = await ProductModel.countDocuments()
            if(skip>= productCount){
                res.status(500).send({
                    success : false,
                    message : "This page does not exists !"
                })
            }
        }

        console.log(page,limit,skip)


        const findProduct = await query // trả về kết quả
        res.status(200).send({
            success : true,
            message : "get all product error !",
            findProduct
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "get all product error !"
        })
    }
})


const addToWishlist = asyncHandle(async(req,res)=>{
    const {id}= req.user // duoc tao o middleware
    const {proId}=req.body
    try {
        const user = await userModel.findById(id)
        const areadyadded = user.wishlist.find(id=>id.toString()===proId)
        if(areadyadded){
            let user = await userModel.findByIdAndUpdate(id,{
                $pull : {wishlist:proId}
            },{new:true})
            res.json(user)
        }
        else{
            let user = await userModel.findByIdAndUpdate(id,{
                $push : {wishlist:proId}
            },{new:true})
            res.json(user)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "addToWishlist error !"
        })
    }
})

// danh gai san pham
const rating = asyncHandle(async (req, res) => {
    const { _id } = req.user;
    const { star, prodId, comment } = req.body;
    try {
      const product = await ProductModel.findById(prodId);
      let alreadyRated = product?.ratings.find(
        (userId) => userId.postedby.toString() === _id.toString()
      );
      if (alreadyRated) {
        const updateRating = await ProductModel.updateOne(
          {
            ratings: { $elemMatch: alreadyRated },
          },
          {
            $set: { "ratings.$.star": star, "ratings.$.comment": comment },
          },
          {
            new: true,
          }
        );
      } else {
        const rateProduct = await ProductModel.findByIdAndUpdate(
          prodId,
          {
            $push: {
              ratings: {
                star: star,
                comment: comment,
                postedby: _id,
              },
            },
          },
          {
            new: true,
          }
        );
      }
      const getallratings = await ProductModel.findById(prodId);
      let totalRating = getallratings.ratings.length;
      let ratingsum = getallratings.ratings
        .map((item) => item.star)
        .reduce((prev, curr) => prev + curr, 0);
      let actualRating = Math.round(ratingsum / totalRating); //  tinh duoc ti le cua sao de  hien thi  sao
      let finalproduct = await ProductModel.findByIdAndUpdate(
        prodId,
        {
          totalrating: actualRating,
        },
        { new: true }
      );
      res.json(finalproduct);
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "rating error !"
        })
    }
  });


module.exports = {createProduct ,getaProduct,getAllProduct,updateProduct,deleteProduct,addToWishlist,rating}

