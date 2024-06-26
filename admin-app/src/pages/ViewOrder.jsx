import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {getOrderById } from '../features/auth/authSlice';

const columns = [
  {
    title: 'No.',
    dataIndex: 'key',
  },
  {
    title: 'Product Name',
    dataIndex: 'name',
    sorter :(a,b)=>a.name.length - b.name.length
  },
   {
    title: 'Brand Name',
    dataIndex: 'brand',
    sorter :(a,b)=>a.name.length - b.name.length
  },
  {
    title: 'Count',
    dataIndex: 'count',
  },
  {
    title: 'Color',
    dataIndex: 'color',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
  },
  {
    title: 'Data',
    dataIndex: 'data',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const ViewOrder = () => {
  const location = useLocation()
  const userId = location.pathname.split('/')[3]
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getOrderById(userId))
  },[])

  const stateOrders = useSelector(state=>state.auth?.orderbyuser?.products)

  const data1 = [];
  for (let i = 0; i < stateOrders?.length; i++) {
      data1.push({
          key: i+1,
          name: stateOrders[i]?.product?.title,
          brand: stateOrders[i]?.product?.brand,
          count: stateOrders[i]?.count,
          amount: stateOrders[i]?.product?.price,
          color: stateOrders[i]?.product?.color,
          data: new Date(stateOrders[i]?.product?.createdAt).toLocaleString(),
          action: (
              <>
                <Link to="/"><FaEdit className='fs-5 text-secondary'/></Link>
                <Link to="/"><MdDelete className='ms-3 fs-5 text-danger'/></Link>
              </>
            )
      });
  }
    return (
        <div>
            <h3 className='mb-4 title'>
                View User Order
            </h3>
            <div className="">
                <Table  columns={columns} dataSource={data1} />
            </div>
        </div>
    );
}

export default ViewOrder;
