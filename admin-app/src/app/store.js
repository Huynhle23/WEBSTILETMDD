import {configureStore} from '@reduxjs/toolkit'
// kết nối với slice
import authReducer from '../features/auth/authSlice'
import customerReducer from '../features/customer/customerSlice'
import productReducer from '../features/product/productSlice'
import brandReducer from '../features/brand/brandSlice'
import pcategoryReducer from '../features/pcategory/pcategorySlice'
import colorReducer from '../features/color/colorSlice'
import blogReducer from '../features/blog/blogSlice'
import blogCategoryReducer from '../features/blogcategory/blogcategorySlice'
import enquiryReducer from '../features/enquiry/enquirySlice'
import uploadReducer from '../features/upload/uploadSlice'
import couponReducer from '../features/coupon/couponSlice'
// tổng hợp các reducer để truyền vào provider
export const store = configureStore({
    reducer:{
        auth : authReducer,
        customer:customerReducer,
        product:productReducer,
        brand:brandReducer,
        coupon:couponReducer,
        category:pcategoryReducer,
        color:colorReducer,
        blog:blogReducer,
        blogcategory:blogCategoryReducer,
        enquiry:enquiryReducer,
        upload:uploadReducer,
    }
})