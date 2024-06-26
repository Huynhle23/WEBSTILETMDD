import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteColor, getColor } from '../features/color/colorSlice';
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
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

const ColorList = () => {
  const [open, setOpen] = useState(false);
  const [colorId, setColorId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setColorId(e)
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getColor())
  },[])

  const stateColor = useSelector(state=>state.color.colors)
  const data1 = [];
  for (let i = 0; i < stateColor.length; i++) {
      data1.push({
          key: i+1,
          title: stateColor[i].title,
          time : moment(stateColor[i].createdAt).tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss"),
          action: (
              <>
                <Link to={`/admin/color/${stateColor[i]._id}`}><FaEdit className='fs-5 text-secondary'/></Link>
                <button 
                  className='bg-transparent border-0'
                  onClick={()=>{
                    showModal(stateColor[i]._id)
                  }}
                  >
                  <MdDelete className='ms-3 fs-5 text-danger'/>
                </button>              </>
            )
      });
  }
    const deleteCl =(e)=>{
      dispatch(deleteColor(e))
      setOpen(false);
      setTimeout(() => {
        dispatch(getColor());
      }, 100);
    }
    return (
        <div>
            <h3 className='mb-4 title'>
                Color List
            </h3>
            <div className="">
                <Table  columns={columns} dataSource={data1} />
            </div>
            <CustomModel 
            hideModal={hideModal} 
            open={open} 
            performAction={()=>{deleteCl(colorId)}}
            title="Are you sure you want to delete this color ?" />
        </div>
    );
}

export default ColorList;
