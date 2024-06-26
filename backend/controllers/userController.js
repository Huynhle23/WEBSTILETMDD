const { genarateToken } = require('../config/jwtToken.js')
const { genarateRefreshToken } = require('../config/refreshToken.js')
const userModel = require('../models/userModel.js')
const asyncHandle = require('express-async-handler');
const validateMongooseDbId = require('../utils/validateMongoose.js');
const jwt =require('jsonwebtoken');
const { sendEmail } = require('./emailController.js');
const crypto = require('crypto');
const cartModel = require('../models/cartModel.js');
const productModel = require('../models/productModel.js');
const couponModel = require('../models/couponModel.js');
const orderModel = require('../models/orderModel.js');
// const uniquid = require("uniqid")
// create user
const createUser = async(req,res)=>{
    const {email} = req.body
    const exisitingUser = await userModel.findOne({email}) // kiểm tra có email nào chưa 
        if(exisitingUser){
            return res.status(500).send({
                success : false,
                message : 'Alrealy register please login' // nếu tìm thấy có tồn tại 
            })
        }
    try {
        const newUser = new userModel(req.body).save()
        res.status(201).send({
            newUser:req.body,
            success:true,
            message : "Create new user successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message : "Create new User False",
            success : false,
            error:error
        })
    }
}

// login user
const loginUser = asyncHandle(async(req,res)=>{
    const {email,password} = req.body
    
    const findUser = await userModel.findOne({email})
    if(findUser && (await findUser.isPasswordMatched(password))){
        const refreshToken = await genarateRefreshToken(findUser?._id)
        const updateUser = await userModel.findByIdAndUpdate(findUser?._id,{
            refreshToken:refreshToken
        },{
            new : true
        })
        res.cookie("refreshToken",refreshToken,{
            httpOnly : true,
            maxAge : 72 * 60 * 60 * 1000
        })
        res.status(201).send({
            success:true,
            message : "Login successfully",
            _id : findUser?._id,
            firstname : findUser?.firstname,
            lastname : findUser?.lastname,
            email : findUser?.email,
            role : findUser?.role,
            token : genarateToken(findUser?._id), 
            // hiển thị ra token
        })
        // window.location.reload()
    }else{
        return res.status(500).send({
            success : true,
            message : 'please create new user, Invalid' // nếu tìm thấy có tồn tại 
        })
    }
})

// login admin
const loginAdmin = asyncHandle(async(req,res)=>{
    const {email,password} = req.body
    const findAdmin = await userModel.findOne({email})
    if(findAdmin.role !=='admin'){
        return res.status(500).send({
            success : false,
            message : 'not authorised' // nếu tìm thấy có tồn tại 
        })
    }
    if(findAdmin && (await findAdmin.isPasswordMatched(password))){
        const refreshToken = await genarateRefreshToken(findAdmin?._id)
        const updateUser = await userModel.findByIdAndUpdate(findAdmin?._id,{
            refreshToken:refreshToken
        },{
            new : true
        })
        res.cookie("refreshToken",refreshToken,{
            httpOnly : true,
            maxAge : 72 * 60 * 60 * 1000
        })
        res.status(201).send({
            success:true,
            message : "Login successfully",
            _id : findAdmin?._id,
            firstname : findAdmin?.firstname,
            lastname : findAdmin?.lastname,
            email : findAdmin?.email,
            mobile : findAdmin?.mobile,
            role : findAdmin?.role,
            token : genarateToken(findAdmin?._id), // hiển thị ra token
        })
    }else{
        return res.status(500).send({
            success : true,
            message : 'please create new user, Invalid' // nếu tìm thấy có tồn tại 
        })
    }
})

// handle refresh token 
const handleRefreshToken = asyncHandle(async(req,res)=>{
    const cookie = req.cookies
    console.log(cookie)
    if(!cookie?.refreshToken){
        res.send({
            success : false,
            message : "No refresh token in cookies"
        })
    }
    const refreshToken = cookie?.refreshToken
    console.log(refreshToken)
    const user = await userModel.findOne({refreshToken})
    if(!user){
        res.status(401).send({
            success : false,
            message : "No refresh token present in db or not matched",
            user
        })
    }
    jwt.verify(refreshToken,"SECRET",(err,decoded)=>{
        if(err||user.id !== decoded.id){
            res.status(401).send({
                success : false,
                message : "there is something wrong with refresh token"
            })
        }
        const accessToken = genarateToken(user.id)
        res.status(200).send({
            success : true,
            message : "refresh token success",
            accessToken
        })
    })
})

// logout func
const logout = asyncHandle(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
    const refreshToken = cookie.refreshToken;
    const user = await userModel.findOne({ refreshToken });
    if (!user) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
      });
      return res.status(200).send({
        success : true,
        message : "clear cookies success"
      }); // forbidden
    }
    await userModel.findOneAndUpdate({ refreshToken }, {
        $set: { refreshToken: "" },
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    res.status(200).send({
        success : true,
        message : "clear cookies success"
    }); // forbidden
});

// get all users
const getAllUsers = async(req,res)=>{
    try {
        const user = await userModel.find({})
        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "Get all users error !"
        })
    }
}

// get a user
const getsignUser = async(req,res)=>{
    const {_id} = req.params // lấy trên url
    validateMongooseDbId(_id)
    try {
        const getUser = await userModel.findById(_id)
        res.status(200).json({
            success : true,
            message : "Get user successfully !",
            getUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "Get user error !"
        })
    }
}

// update user
const updateUser = asyncHandle(async(req,res)=>{
    const { _id } = req.user
    validateMongooseDbId(_id)
    try {
        const user = await userModel.findByIdAndUpdate(_id,{
            firstname : req?.body?.firstname,
            lastname : req?.body?.lastname,
            email :  req?.body?.email,
        },{
            new :true
        })
        res.status(200).send({
            success : true,
            message : "Updated user successfully !",
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "Update user error !"
        })
    }
})

// delete a user
const deletesignUser = async(req,res)=>{
    const {_id} = req.params // lấy trên url
    validateMongooseDbId(_id)
    try {
        const user = await userModel.findByIdAndDelete(_id)
        res.status(200).json({
            success : true,
            message : "delete user successfully !"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "delete user error !"
        })
    }
}

// set isBlock = true
const blockUser = asyncHandle(async (req, res) => {
    const { id } = req.params;
    validateMongooseDbId(id)
    try {
        const blockusr = await userModel.findByIdAndUpdate(id,{isBlocked: true,},{new: true,});
        res.send(blockusr);
    } catch (error) {
        res.status(500).send({
            success : false,
            message : "block user error !"
        })
    }
});

// set isBlock = false
const unblockUser = asyncHandle(async (req, res) => {
    const { id } = req.params
    validateMongooseDbId(id)
    try {
        const unblock = await userModel.findByIdAndUpdate(id,{isBlocked: false,},{new: true,});
        res.send({
        message: "User UnBlocked",
        });
    } catch (error) {
        res.status(500).send({
            success : false,
            message : "unblock user error !"
        })
    }
});

const updatePassword = asyncHandle(async(req,res)=>{
    const {_id} = req.user
    const password = req.body.password
    validateMongooseDbId(_id)
    const user = await userModel.findById(_id)
    console.log(password)
    if (password) {
        user.password = password;
        const updatedPassword = await user.save();
        res.status(200).send({
            success : true,
            message: "Update password success",
            updatedPassword
        });
      } else {
        res.status(200).send({
            success : true,
            message: "Update password ...",
            user
        });
      }
})


const forgotPasswordToken = asyncHandle(async(req,res)=>{
    const {email}= req.body
    const user = await userModel.findOne({email})
    if(!user){
        res.status(500).send({
            success : true,
            message: "user not fount with this email"
        });
    }
    try {
        const token = await user.createPasswordResetToken()
        await user.save()
        const resetURL =`Hi, please follow this link to reset Your Password. <a href='http://localhost:5000/api/user/forgot-password/${token}'>Click here</a>`
        const data = {
            to:email,
            subject :"Forgot password link",
            htm : resetURL,
            text:"Hey user"
        }
        sendEmail(data)
        res.status(200).send({
            success : true,
            message: "success",
            token
        });
    } catch (error) {
        res.status(500).send({
            success : true,
            message: error,
        });
    }
})

const resetPassword = asyncHandle(async(req,res)=>{
    const { password }= req.body // được gửi ở request
    const {token} = req.params // lây token ở phía trên forgot pass
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')
    const user = await userModel.findOne({
        passwordResetToken : hashedToken,
        passwordResetExpires : {$gt:Date.now()}
    })
    if(!user){
        res.status(500).send({
            success : true,
            message: "Token expired, please try again later ",
        });
    }
    user.password = password
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save()
    res.status(200).send({
        success : true,
        message: "Token success",
        user
    });
})


const getWishList =asyncHandle(async(req,res)=>{
    const {id} =req.user
    try {
        const findUser = await userModel.findById(id).populate('wishlist')
        res.json(findUser)
    } catch (error) {
        res.status(500).send({
            success : false,
            message: "get wish list false",
            error
        });
    }
})

// save user address
const saveAddress = asyncHandle(async(req,res)=>{
    const {id} = req.user
    try {
        const user = await userModel.findByIdAndUpdate(id,{
            address : req?.body?.address
        },{
            new :true
        })
        res.status(200).send({
            success : true,
            message : "Updated user successfully !",
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "Update user error !"
        })
    }
})

// cart 
const userCart = asyncHandle(async (req, res) => {
    const { productId,color,quantity,price } = req.body;
    console.log({productId,color,quantity,price})
    const { _id } = req.user;
    try {
      let newCart = await new cartModel({
        userId:_id,
        productId,
        quantity,
        price,
        color,
      }).save();

      res.json({
        newCart
      });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "cart user error !"
        })
    }
});

// get user cart 
const getUserCart = asyncHandle(async(req,res)=>{
    const {_id} = req.user
    try {
        //tìm kiếm id người thêm vào giỏ hàng
        // truy tới và hiển thị ra chi tiết của product
        const cart = await cartModel.find({userId : _id})
            .populate("productId").populate("color")
        res.json(cart)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "get cart user error !"
        })
    }
})

const removeProductCart=asyncHandle(async(req,res)=>{
    const {_id} = req.user
    const {cartItemId} = req.params
    try {
        const deleteProductCart = await cartModel.deleteOne({userId:_id,_id:cartItemId})
        res.json(deleteProductCart)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "delete product cart user error !"
        })
    }
})


const updateProductQuantityCart=asyncHandle(async(req,res)=>{
    const {_id} = req.user
    const {cartItemId,newQuantity} = req.params
    try {
        const cartItem = await cartModel.findOne({userId:_id,_id:cartItemId})
        cartItem.quantity = newQuantity
        cartItem.save()
        res.json(cartItem)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "delete product cart user error !"
        })
    }
})


const createOrder = asyncHandle(async(req,res)=>{
    const {shippingInfo,orderItems,totalPrice} = req.body
    const {_id} = req.user
    console.log(shippingInfo,orderItems,totalPrice,_id)
    try{
        const order = await orderModel.create({
            shippingInfo,orderItems,totalPrice,orderStatus:"COMPLETED", user:_id
        })
        res.json({
            order,
            success : true
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success : false,
            message : "create order user error !"
        })
    }
})

const getMyOrder = asyncHandle(async(req,res)=>{
    const {_id} = req.user
    try {
        
        const orders = await orderModel.find({user : _id}).populate("orderItems.productId").populate("orderItems.color")
        res.json({
            orders
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "create order user error !"
        })
    }
})

const getAllOrder = async(req,res)=>{
    try {
        //tìm kiếm id mà người dùng login 
        const orderUser = await orderModel.find().populate("user").populate("orderItems.productId")
        res.json(orderUser)

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "get all order user error !"
        })
    }
}
const emptyCart = async(req,res)=>{
    const {_id} = req.user
    try {
        //tìm kiếm id mà người dùng login 
        const user = await userModel.findOne({_id})
        const cart = await cartModel.deleteMany({userId : user._id})
        res.json(cart)

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "emptyCart user error !"
        })
    }
}

const updateStatusOrder = async(req,res)=>{
    const { _id, status } = req.params;
    try {
        // Tìm đơn hàng cần cập nhật bằng _id
        const updateOrder = await orderModel.findById(_id);

        if (!updateOrder) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        // Cập nhật trạng thái đơn hàng
        updateOrder.status = status;
        await updateOrder.save();

        res.json(updateOrder);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Update order error!",
        });
    }
}

module.exports = {createUser,loginUser,getAllUsers,getsignUser,deletesignUser
    ,updateUser,blockUser,unblockUser,handleRefreshToken,logout,updatePassword,
    forgotPasswordToken,resetPassword,loginAdmin,getWishList,saveAddress,userCart,
    getUserCart,removeProductCart,updateProductQuantityCart,createOrder,getMyOrder,
    getAllOrder,emptyCart,updateStatusOrder}