import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { delEnquiry, getEnquiry, resetState, updEnquiry } from '../features/enquiry/enquirySlice';
import { Link } from 'react-router-dom';
import { FaRegEye  } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import CustomModel from '../components/CustomModel';

const columns = [
  {
    title: 'No.',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Mobile',
    dataIndex: 'mobile',
  },
  {
    title: 'Comment',
    dataIndex: 'comment',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const Emquiries = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [enquiryId, setEnquiryId] = useState("")
  const showModal = (e) => {
    setOpen(true);
    setEnquiryId(e)
  }

  const hideModal = () => {
    setOpen(false)
  }

  useEffect(()=>{
    dispatch(resetState())
    dispatch(getEnquiry())
  },[])

  const stateEmquiry = useSelector(state=>state.enquiry?.enquiries)
  const data1 = [];
  const setEnqStatus=(e,id)=>{
    console.log(e,id)
    const data={id:id,enqData:e}
    dispatch(updEnquiry(data))
  }
  for (let i = 0; i < stateEmquiry?.length; i++){
    data1.push({
        key: i+1,
        name: stateEmquiry[i]?.name,
        email: stateEmquiry[i]?.email,
        mobile: stateEmquiry[i]?.mobile,
        comment: stateEmquiry[i]?.comment,
        status: (
          <>
            <select 
              name="" 
              defaultValue={stateEmquiry[i]?.status ? stateEmquiry[i]?.status : "Submitted"} 
              className='form-control form-select' 
              id=""
              onChange={(e)=>setEnqStatus(e.target.value,stateEmquiry[i]?._id)}
              >
              <option value="Submitted">Submitted</option>
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
          </select>
          </>
        ),
        action: (
          <>
            <Link to={`/admin/enquiries/${stateEmquiry[i]?._id}`}><FaRegEye className='fs-5 text-secondary'/></Link>
            <button 
              className='bg-transparent border-0'
              onClick={()=>{
                showModal(stateEmquiry[i]?._id)
              }}
              >
              <MdDelete className='ms-3 fs-5 text-danger'/>
            </button>          
          </>
        )
      });
    }
    const deleteCl =(e)=>{
      dispatch(delEnquiry(e))
      setOpen(false);
      setTimeout(() => {
        dispatch(getEnquiry())
      }, 100)
    }
    return (
        <div>
            <h3 className='mb-4 title'>
                Enquiries
            </h3>
            <div className="">
                <Table  columns={columns} dataSource={data1}/>
            </div>
            <CustomModel 
              hideModal={hideModal} 
              open={open} 
              performAction={()=>{deleteCl(enquiryId)}}
              title="Are you sure you want to delete this Enquiries ?" />
        </div>
    );
}

export default Emquiries;
