import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteABlog, getBlog } from '../features/blog/blogSlice';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import moment from 'moment-timezone';
import CustomModel from '../components/CustomModel';
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
    title: 'Category',
    dataIndex: 'category',
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

const BlogList = () => {
  const [open, setOpen] = useState(false);
  const [blogId, setBlogId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setBlogId(e)
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getBlog())
  },[])

  const stateBlog = useSelector(state=>state.blog.blogs)
  const data1 = [];
  for (let i = 0; i < stateBlog.length; i++) {
      data1.push({
          key: i+1,
          title: stateBlog[i].title,
          category: stateBlog[i].category,
          time : moment(stateBlog[i].createdAt).tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss"),
          action: (
              <>
                <Link to={`/admin/add-blog/${stateBlog[i]._id}`}><FaEdit className='fs-5 text-secondary'/></Link>
                <button 
                  className='bg-transparent border-0'
                  onClick={()=>{
                    showModal(stateBlog[i]._id)
                  }}
                  >
                  <MdDelete className='ms-3 fs-5 text-danger'/>
                </button>
              </>
            )
      });
  }
  const deleteBl =(e)=>{
    dispatch(deleteABlog(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBlog());
    }, 100);
  }
  return (
    <div>
      <h3 className='mb-4 title'>
          Blog List
      </h3>
      <div className="">
          <Table  columns={columns} dataSource={data1} />
      </div>
      <CustomModel 
          hideModal={hideModal} 
          open={open} 
          performAction={()=>{deleteBl(blogId)}}
          title="Are you sure you want to delete this blog ?" />
    </div>
  );
}

export default BlogList;
