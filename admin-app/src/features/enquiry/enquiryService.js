// kết nối với backend 
import axios from "axios";
import {base_url} from '../../utils/base_url'
import {config} from '../../utils/axiosconfig';

const getEnquiry = async()=>{
    const res = await axios.get(`${base_url}enq/get-all-enq`)
    return res.data
}
const delEnquiry = async(id)=>{
    const res = await axios.delete(`${base_url}enq/delete-enq/${id}`,config)
    return res.data
}

const getAEnquiry = async(id)=>{
    const res = await axios.get(`${base_url}enq/get-enq/${id}`)
    return res.data
}

const updateEnquiry = async(enq)=>{
    const res = await axios.put(`${base_url}enq/update-enq/${enq.id}`,{status : enq.enqData},config)
    return res.data
}

const enquiryService={
    getEnquiry,delEnquiry,getAEnquiry,updateEnquiry
}

export default enquiryService