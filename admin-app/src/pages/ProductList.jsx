import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePr, getProducts } from '../features/product/productSlice';
import { toast } from "react-toastify";
import moment from 'moment-timezone';

const columns = [
  {
    title: 'STT',
    dataIndex: 'key',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: 'Time',
    dataIndex: 'time',
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    sorter: (a, b) => a.quantity - b.quantity,
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const ProductList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const productState = useSelector((state) => state.product.products);

  const handleDeleteProduct = (id) => {
    dispatch(deletePr(id));
    toast.success("Deleted product successfully");
    setTimeout(() => {
      dispatch(getProducts());
    }, 300);
  };

  const data1 = [];
  for (let i = 0; i < productState?.length; i++) {
    const truncatedTitle = productState[i]?.title.length > 20 ? productState[i]?.title.slice(0, 50) + '...' : productState[i].title;
    data1.push({
      key: i + 1,
      title: truncatedTitle,
      time: moment(productState[i].createdAt).tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss"),
      brand: productState[i]?.brand,
      category: productState[i]?.category,
      price: productState[i]?.price,
      quantity: productState[i]?.quantity,
      action: (
        <>
          <Link to={`/admin/update-product/${productState[i]?._id}`}>
            <FaEdit className='fs-5 text-secondary' />
          </Link>
          <button
            style={{ border: "none" }}
            className='bg-white'
            onClick={() => handleDeleteProduct(productState[i]?._id)}
          >
            <MdDelete className='ms-3 fs-5 text-danger' />
          </button>
        </>
      ),
    });
  }

  return (
    <div>
      <h3 className='mb-4 title'>
        Products List
      </h3>
      <div className="">
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ProductList;
