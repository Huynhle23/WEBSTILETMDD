import axios from 'axios'
import { base_url } from '../../utils/base_url'
import {config} from '../../utils/axiosconfig'

const postQuery=async(contactData)=>{
    const res = await axios.post(`${base_url}enq/create-enq`,contactData)
    if(res.data){
        return res.data
    }
}


export const contactService={
    postQuery
}