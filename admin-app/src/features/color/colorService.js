// kết nối với backend 
import axios from "axios";
import {base_url} from '../../utils/base_url'
import {config} from '../../utils/axiosconfig';

const getColor = async()=>{
    const res = await axios.get(`${base_url}color/get-all-color`)
    return res.data
}

const createColor =async(color)=>{
    const res = await axios.post(`${base_url}color/create-color`,color,config)
    return res.data
}

const getIdColor =async(id)=>{
    const res = await axios.get(`${base_url}color/get-color/${id}`,config)
    return res.data
}

const updateColor =async(color)=>{
    const res = await axios.put(`${base_url}color/update-color/${color?._id}`,{title:color?.colorData?.title},config)
    return res.data
}

const deleteColor =async(id)=>{
    const res = await axios.delete(`${base_url}color/delete-color/${id}`,config)
    return res.data
}

const colorService={
    getColor,createColor,getIdColor,updateColor,deleteColor
}

export default colorService