import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteABlogCat, getblogCategory } from '../features/blogcategory/blogcategorySlice';
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import CustomModel from '../components/CustomModel';
import { MdDelete } from "react-icons/md";
const columns = [
  {
    title: 'No.',
    dataIndex: 'key',
  },
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  }
];

const BlogCatlist = () => {
  const [open, setOpen] = useState(false);
  const [blogCategoryId, setBlogCategoryId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setBlogCategoryId(e)
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getblogCategory())
  },[])

  const stateBlogCategory = useSelector(state=>state.blogcategory.blogCategories)
  const data1 = [];
  for (let i = 0; i < stateBlogCategory.length; i++) {
      data1.push({
          key: i+1,
          title: stateBlogCategory[i].title,
          action: (
              <>
                <Link to={`/admin/blog-category/${stateBlogCategory[i]._id}`}><FaEdit className='fs-5 text-secondary'/></Link>
                <button 
                  className='bg-transparent border-0'
                  onClick={()=>{
                    showModal(stateBlogCategory[i]._id)
                  }}
                  >
                  <MdDelete className='ms-3 fs-5 text-danger'/>
                </button>              
              </>
            )
      });
  }
  const deleteBlogCate =(e)=>{
    dispatch(deleteABlogCat(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getblogCategory());
    }, 100);
  }
  return (
      <div>
          <h3 className='mb-4 title'>
              Blog Category List
          </h3>
          <div className="">
              <Table  columns={columns} dataSource={data1} />
          </div>
          <CustomModel 
            hideModal={hideModal} 
            open={open} 
            performAction={()=>{deleteBlogCate(blogCategoryId)}}
            title="Are you sure you want to delete this blog category ?" />
      </div>
  );
}

export default BlogCatlist;
