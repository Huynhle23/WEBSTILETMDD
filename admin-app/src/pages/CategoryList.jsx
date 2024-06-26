import React, { useEffect, useState } from 'react';
import {  Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory, getCategory } from '../features/pcategory/pcategorySlice';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import CustomModel from '../components/CustomModel';
import moment from 'moment-timezone';

const columns = [
  {
    title: 'No.',
    dataIndex: 'key',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    sorter :(a,b)=>a.title.length - b.title.length
  },
  {
    title: 'Time',
    dataIndex: 'time',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const CategoryList = () => {

  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setCategoryId(e)
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getCategory())
  },[])

  const stateCategory = useSelector(state=>state.category.categories)
  const data1 = [];
  for (let i = 0; i < stateCategory.length; i++) {
      data1.push({
          key: i+1,
          title: stateCategory[i].title,
          time : moment(stateCategory[i].createdAt).tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss"),
          action: (
              <>
                <Link to={`/admin/category/${stateCategory[i]._id}`}><FaEdit className='fs-5 text-secondary'/></Link>
                <button 
                  className='bg-transparent border-0'
                  onClick={()=>{
                    showModal(stateCategory[i]._id)
                  }}
                  >
                  <MdDelete className='ms-3 fs-5 text-danger'/>
                </button>
              </>
            )
      });
    }
    const deleteCt =(e)=>{
      dispatch(deleteCategory(e));
      setOpen(false);
      setTimeout(() => {
        dispatch(getCategory());
      }, 100);
    }
    return (
        <div>
            <h3 className='mb-4 title'>
                Products Category
            </h3>
            <div className="">
                <Table  columns={columns} dataSource={data1} />
            </div>
            <CustomModel 
            hideModal={hideModal} 
            open={open} 
            performAction={()=>{deleteCt(categoryId)}}
            title="Are you sure you want to delete this brand ?" />
        </div>
    );
}

export default CategoryList;
