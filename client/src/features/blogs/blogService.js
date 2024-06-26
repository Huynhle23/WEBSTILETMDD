import axios from 'axios'
import { base_url } from '../../utils/base_url'
import { config } from '../../utils/axiosconfig'

const getAllBlog=async()=>{
    const res = await axios.get(`${base_url}blog/get-all-blog`)
    if(res.data){
        return res.data
    }
}
const getBlog=async(id)=>{
    const res = await axios.get(`${base_url}blog/get-blog/${id}`)
    if(res.data){
        return res.data
    }
}

export const blogService={
    getAllBlog,getBlog
}