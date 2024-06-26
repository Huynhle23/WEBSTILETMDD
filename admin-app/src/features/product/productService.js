import axios from 'axios'
import {base_url} from '../../utils/base_url'
import {config}  from '../../utils/axiosconfig'

const getProducts =async()=>{
    const res = await axios.get(`${base_url}product/getall-product`)
    return res.data
}

const getaProduct =async(id)=>{
    const res = await axios.get(`${base_url}product/get-product/${id}`)
    return res.data
}
const createProducts =async(product)=>{
    const res = await axios.post(`${base_url}product/create-product`,product,config)
    return res.data
}


const udProduct =async(data)=>{
    const res = await axios.put(`${base_url}product/update-product/${data.id}`,data.values,config)
    return res.data
}


const deleteProduct =async(id)=>{
    const res = await axios.delete(`${base_url}product/delete-product/${id}`,config)
    return res.data
}

const productService ={
    getProducts,getaProduct,
    createProducts,deleteProduct,udProduct
}

export default productService