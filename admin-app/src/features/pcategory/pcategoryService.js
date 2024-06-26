import axios from "axios";
import {base_url} from '../../utils/base_url'
import {config} from '../../utils/axiosconfig';

const getPcategory = async()=>{
    const res = await axios.get(`${base_url}category/get-all-category`)
    return res.data
}

const createCategory =async(category)=>{
    const res = await axios.post(`${base_url}category/create-category`,category,config)
    return res.data
}

const getIdCategory =async(id)=>{
    const res = await axios.get(`${base_url}category/get-category/${id}`,config)
    return res.data
}

const updateCategory =async(category)=>{
    const res = await axios.put(`${base_url}category/update-category/${category?._id}`,{title:category?.categoryData?.title},config)
    return res.data
}

const deleteCategory =async(id)=>{
    const res = await axios.delete(`${base_url}category/delete-category/${id}`,config)
    return res.data
}

const pcategoryService={
    getPcategory,createCategory,getIdCategory,updateCategory,deleteCategory
}

export default pcategoryService