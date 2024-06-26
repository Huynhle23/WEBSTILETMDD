import axios from "axios"
import { base_url } from "../../utils/base_url"
import { config } from "../../utils/axiosconfig"




// PUT
// update Oder
const updateOder =async (data)=>{
    const res = await axios.put(`${base_url}user/order/update-order/${data._id}/${data.status}`,"",config)
    return res.data
}


const oderService ={
  updateOder
}

export default oderService