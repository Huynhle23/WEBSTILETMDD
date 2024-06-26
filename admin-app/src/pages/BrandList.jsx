import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import {useDispatch,useSelector} from 'react-redux'
import { deleteBrand, getBrands } from '../features/brand/brandSlice';
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

const BrandList = () => {
  const [open, setOpen] = useState(false);
  const [brandId, setBrandId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setBrandId(e)
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getBrands())
  },[])

  const stateBrands = useSelector(state=>state.brand.brands)
  const data1 = [];
  for (let i = 0; i < stateBrands.length; i++) {
      data1.push({
          key: i+1,
          title: stateBrands[i].title,
          time : moment(stateBrands[i].createdAt).tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss"),
          action: (
              <>
                <Link to={`/admin/brand/${stateBrands[i]._id}`}><FaEdit className='fs-5 text-secondary'/></Link>
                <button 
                  className='bg-transparent border-0'
                  onClick={()=>{
                    showModal(stateBrands[i]._id)
                  }}
                  >
                  <MdDelete className='ms-3 fs-5 text-danger'/>
                </button>
              </>
            )
      });
  }
  const deleteBr =(e)=>{
    dispatch(deleteBrand(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBrands());
    }, 100);
  }
  return (
      <div>
          <h3 className='mb-4 title'>
              Brand List
          </h3>
          <div className="">
              <Table  columns={columns} dataSource={data1} />
          </div>
          <CustomModel 
            hideModal={hideModal} 
            open={open} 
            performAction={()=>{deleteBr(brandId)}}
            title="Are you sure you want to delete this brand ?" />
      </div>
  );
}

export default BrandList;
