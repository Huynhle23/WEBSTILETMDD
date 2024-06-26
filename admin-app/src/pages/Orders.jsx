import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment-timezone';
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { getAllOrder,getOrder} from '../features/auth/authSlice';
import { updateOrder } from '../features/order/orderSlice';
import { toast } from 'react-toastify';

const columns = [
  {
    title: 'STT',
    dataIndex: 'key',
  },
  {
    title: 'User',
    dataIndex: 'user',
    sorter :(a,b)=>a.title.length - b.title.length
  },
  {
    title: 'Products',
    dataIndex: 'products',
  },
  {
    title: 'Time',
    dataIndex: 'time',
  },
  {
    title: 'Total Price',
    dataIndex: 'totalprice',
  },
  {
    title:"Status",
    dataIndex: 'status',
  },
  {
    title:"Action",
    dataIndex: 'action',
  }
];


const Orders = () => {
  const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(getAllOrder())
    },[])
    
    const orderState = useSelector(state=>state?.auth?.orders)
    
    console.log(orderState)
    const handleOnchangeOrder =  (id,e)=>{
      const data = {_id : id, status :e.target.value}
      dispatch(updateOrder(data))
      toast.success("Update order success !")
      setTimeout(() => {
        dispatch(getAllOrder())
      }, 300);
    }
    const data1 = [];
    for (let i = 0; i < orderState?.length; i++) {
        data1.push({
            key: i+1,
            user: (
                <div>
                    <p>Tên : {orderState[i]?.user?.firstname + " "+ orderState[i]?.user?.lastname}</p>
                    <p>Số điện thoại : {orderState[i]?.user?.mobile}</p>
                    <p>Địa chỉ : {orderState[i]?.shippingInfo?.address}</p>
                    <p>Quốc gia : {orderState[i]?.shippingInfo?.country}</p>
                </div>
            ),
            products: (
                    orderState[i]?.orderItems && orderState[i]?.orderItems?.map((e,index)=>(
                    <div key={index} className='mb-4'>
                        <p>Tên sản phẩm : {e?.productId?.title}</p>
                        <p>Số lượng đặt hàng : {e?.quantity}</p>
                        <p>Giá : {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(e?.productId?.price)}                                                                                                                                                        
                        </p>
                    </div>
                    ))
            ),
            time: moment(orderState[i].createdAt).tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss"),                       
            totalprice: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(orderState[i]?.totalPrice),
            status: orderState[i]?.orderStatus === "COMPLETED" ? 
                (<p className='mb-0'>Đã thanh toán</p>) :(<p>Thanh toán khi nhận hành</p>) ,
            action: (
                    <>
                        <select 
                        name="" 
                        defaultValue={orderState[i]?.status
} 
                        className='form-control form-select' 
                        id=""
                          onChange={(e)=>handleOnchangeOrder(orderState[i]?._id,e)}
                        >
                        <option value="Đang xử lý">Đang xử lý</option>
                        <option value="Đang chuẩn bị hàng">Đang chuẩn bị hàng</option>
                        <option value="Đang giao hàng">Đang giao hàng</option>
                        <option value="Giao hàng thành công">Giao hàng thành công</option>
                        </select>
                    </>
                ),
            });
    }
    return (
        <div>
            <h3 className='mb-4 title'>
                Orders
            </h3>
            <div className="">
                <Table  columns={columns} dataSource={data1} />
            </div>
        </div>
    );
}

export default Orders;