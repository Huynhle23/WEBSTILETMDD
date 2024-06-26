import React, { useEffect } from 'react';
import {  Table } from 'antd';
import {useDispatch, useSelector} from 'react-redux'
import { getUsers } from '../features/customer/customerSlice';
const columns = [
  // title: tên của cột đó
  // dataindex : dữ liệu sẽ nhận được thông qua trung với key của object nhận
  {
    title: 'STT',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    // cho phép người dùng có thể thay đổi hiển thị từ ít text -> nhiều text , nhiều text ->ít text
    defaultSortOrder:"descend",
    sorter :(a,b)=>a.name.length - b.name.length
  },
  {
    title: 'email',
    dataIndex: 'email',
  },
  {
    title: 'Mobile',
    dataIndex: 'mobile',
  },
];

const Customers = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(getUsers()) // gọi tới slice -> gọi tới service
    },[])
    const data1=[]
    const customerState = useSelector(state=>state.customer.customers) // lấy từ redux 
    for (let i = 0; i < customerState.length; i++) {
      if(customerState[i].role !=="admin"){
        data1.push({
            key: i+1,
            name: customerState[i].firstname +" " + customerState[i].lastname,
            email: customerState[i].email,
            mobile: customerState[i].mobile,
        });
      }
    }

    return (
        <div>
            <h3 className='mb-4 title'>
                Customers
            </h3>
            <div className="">
                <Table  columns={columns} dataSource={data1} />
            </div>
        </div>
    );
}

export default Customers;
