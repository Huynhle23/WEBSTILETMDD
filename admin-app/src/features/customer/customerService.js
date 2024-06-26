import axios from 'axios'
import {base_url} from '../../utils/base_url'
/**
 * có 2 bước : 
 * -    gết nối với hàm bên server 
 * -     đẩy ra thông qua customerService
 *  
 */


// Định nghĩa hàm getUsers trong authService:
const getUsers = async()=>{
    const res = await axios.get(`${base_url}user/all-user`) // nhận được value từ user data
    const data = res.data
    return data
}


// Xuất hàm getUsers và tạo đối tượng authService:

const customerService ={
    getUsers,
}

export default customerService