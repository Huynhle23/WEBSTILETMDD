import axios from "axios";
import {base_url} from '../../utils/base_url'
import {config} from '../../utils/axiosconfig';

const getCoupons = async()=>{
    const res = await axios.get(`${base_url}coupon/get-all-coupon`,config)
    return res.data
}
const createCoupon =async(coupon)=>{
    const res = await axios.post(`${base_url}coupon/create-coupon`,coupon,config)
    return res.data
}
const getIdCoupon =async(id)=>{
    const res = await axios.get(`${base_url}coupon/get-coupon/${id}`,config)
    return res.data
}

const updateCoupon = async (coupon) => {
  const response = await axios.put(
    `${base_url}coupon/update-coupon/${coupon._id}`,
    {
      name: coupon.couponData.name,
      expiry: coupon.couponData.expiry,
      discount: coupon.couponData.discount,
    },
    config
  );

  return response.data;
};

const deleteCoupon =async(id)=>{
    const res = await axios.delete(`${base_url}coupon/delete-coupon/${id}`,config)
    return res.data
}
const couponService={
    getCoupons,
    createCoupon,getIdCoupon,updateCoupon,deleteCoupon
}

export default couponService