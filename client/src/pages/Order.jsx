import React, { useEffect } from 'react'
import Container from '../components/Container'
import BreadCrumb from '../components/BreadCrumb'
import {useDispatch,useSelector} from 'react-redux'
import { Table } from 'antd';
import {getMyorder} from '../features/users/userSlice'
import moment from 'moment-timezone';
export default function Order() {
    // định dạng ngày tháng năm
    const formatDate = (dateString) => {  
        // Tạo một đối tượng Date từ chuỗi ngày
    const date = new Date(dateString);
    // Lấy các thành phần ngày, tháng, năm
    const day = date.getDate();
    const month = date.getMonth() + 1; // Lưu ý: tháng bắt đầu từ 0
    const year = date.getFullYear();
    // Trả về chuỗi định dạng ngày tháng năm
    return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
    };
    
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
    title: 'tình trạng',
    dataIndex: 'st',
  },
  {
    title:"Status",
    dataIndex: 'status',
  }
];
const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(getMyorder())
    },[])
    const orderState = useSelector(state=>state?.auth?.orders?.orders)
    console.log(orderState)
    const data1 = [];
    for (let i = 0; i < orderState?.length; i++) {
        data1.push({
            key: i+1,
            user: (
                <div>
                    <p>Tên : {orderState[i]?.shippingInfo?.firstName+orderState[i]?.shippingInfo?.lastName}</p>
                </div>
            ),
            products: (
                    orderState[i]?.orderItems && orderState[i]?.orderItems?.map((e,index)=>(
                    <div key={index} className='mb-4'>
                        <p>Tên sản phẩm : {e?.productId?.title}</p>
                        <p>Số lượng đặt hàng : {e?.productId?.quantity}</p>
                        <p>Giá : {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(e?.productId?.price)}                                                                                                                                                        
                        </p>
                    </div>
                    ))
            ),
            time: moment(orderState[i].createdAt).tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss"),                        
            totalprice: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(orderState[i]?.totalPrice),
            st: orderState[i]?.status,
            status: orderState[i]?.orderStatus === "COMPLETED" ? 
                (<p className='mb-0'>Đã thanh toán</p>) :(<p>Thanh toán khi nhận hành</p>) ,
            });
    }
  return (
    <>
        <BreadCrumb title="My Orders"/>
        <Container class1="home-wrapper-2 py-5">
            <h3 className='mb-4 title'>
                My Orders
            </h3>
            <div className="">
                <Table className='d-flex flex-column gap-3' columns={columns} dataSource={data1} />
            </div>
        </Container>
    </>
  )
}
