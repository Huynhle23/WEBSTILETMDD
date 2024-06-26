import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import {useDispatch,useSelector} from 'react-redux'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import { deleteCoupon, getCoupons } from '../features/coupon/couponSlice';
import CustomModel from '../components/CustomModel';

const columns = [
  {
    title: 'No.',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    sorter :(a,b)=>a.name.length - b.name.length
  },
  {
    title: 'Discount',
    dataIndex: 'discount',
    sorter :(a,b)=>a.discount - b.discount
  },
   {
    title: 'Expiry',
    dataIndex: 'expiry',
    sorter :(a,b)=>a.name.length - b.name.length
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const CouponList = () => {
  const [open, setOpen] = useState(false);
  const [couponId, setCouponId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setCouponId(e)
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getCoupons())
  },[])

  const stateCoupons = useSelector(state=>state?.coupon?.coupons)
  const data1 = [];
  for (let i = 0; i < stateCoupons?.length; i++) {
      data1.push({
          key: i+1,
          name: stateCoupons[i]?.name,
          discount: stateCoupons[i]?.discount,
          expiry: new Date(stateCoupons[i]?.expiry).toLocaleString(),
          action: (
              <>
                <Link to={`/admin/add-coupon/${stateCoupons[i]._id}`}><FaEdit className='fs-5 text-secondary'/></Link>
                <button 
                  className='bg-transparent border-0'
                  onClick={()=>{
                    showModal(stateCoupons[i]._id)
                  }}
                  >
                  <MdDelete className='ms-3 fs-5 text-danger'/>
                </button>              
              </>
            )
      });
  }
  const deleteCp =(e)=>{
    dispatch(deleteCoupon(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCoupons());
    }, 100);
  }
  return (
      <div>
          <h3 className='mb-4 title'>
              Coupon List
          </h3>
          <div className="">
              <Table  columns={columns} dataSource={data1} />
          </div>
          <CustomModel 
            hideModal={hideModal} 
            open={open} 
            performAction={()=>{deleteCp(couponId)}}
            title="Are you sure you want to delete this coupon ?" />
      </div>
  );
}

export default CouponList;
