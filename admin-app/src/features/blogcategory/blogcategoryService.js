import axios from "axios";
import {base_url} from '../../utils/base_url'
import {config} from '../../utils/axiosconfig';

const getblogcategory = async()=>{
    const res = await axios.get(`${base_url}blogcategory/get-all-blogcategory`)
    return res.data
}
const createBlogCategory =async(blogcategory)=>{
    const res = await axios.post(`${base_url}blogcategory/create-blogcategory`,blogcategory,config)
    return res.data
}


const getIdBlogCategory =async(id)=>{
    const res = await axios.get(`${base_url}blogcategory/get-blogcategory/${id}`,config)
    return res.data
}

const updateBlogCategory =async(blogcategory)=>{
    const res = await axios.put(`${base_url}blogcategory/update-blogcategory/${blogcategory?._id}`,{title:blogcategory?.blogcategoryData?.title},config)
    return res.data
}

const deleteBlogCategory =async(id)=>{
    const res = await axios.delete(`${base_url}blogcategory/delete-blogcategory/${id}`,config)
    return res.data
}
const blogcategoryService={
    getblogcategory,createBlogCategory,getIdBlogCategory,updateBlogCategory,deleteBlogCategory
}

export default blogcategoryService