import axios from 'axios'
import { base_url } from '../../utils/base_url'
import { config } from '../../utils/axiosconfig'

const getAllProduct=async()=>{
    const res = await axios.get(`${base_url}product/getall-product`)
    if(res.data){
        return res.data
    }
}

const getAProduct=async(id)=>{
    const res = await axios.get(`${base_url}product/get-product/${id}`)
    if(res.data){
        return res.data
    }
}
const addToWishList=async(proId)=>{
    const res = await axios.put(`${base_url}product/wishlist`,{proId},config)
    if(res.data){
        return res.data
    }
}

const search = async(keyword)=>{
    const res = await axios.get(`${base_url}product/search/${keyword}`)
    if(res.data){
        return res.data
    }
}


export const productService={
    getAllProduct,addToWishList,getAProduct,search
}