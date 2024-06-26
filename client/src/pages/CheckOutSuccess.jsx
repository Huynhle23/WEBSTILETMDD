import React from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'

export default function CheckOutSuccess() {
  return (
    <div>
        <Meta title="Success"></Meta>
        <BreadCrumb title="Success" ></BreadCrumb>
        <h1 className='text-primary mb-4 text-center'>Thanh Toán Thành Công</h1>
    </div>
  )
}
