import React, { useEffect, useState } from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { Link } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";
import Container from '../components/Container';
import {useDispatch,useSelector} from 'react-redux'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Paypal from '../components/Paypal';
const Checkout = () => {
    const dispatch = useDispatch()
    const cartState = useSelector(state=>state.auth?.cartUser)
    const [totalAmount,setTotalAmount]=useState(null)
    const [shippingInfo,setShippingInfo] = useState(null) 
    const [touch,setTouch] = useState(false) 
    useEffect(()=>{
        let sum = 0
        for(let i = 0;i < cartState?.length ;i++){
            sum += (Number(cartState[i]?.quantity * cartState[i]?.price))
            setTotalAmount(sum)
        }
    },[cartState])
    console.log(shippingInfo)

    let userSchema = Yup.object().shape({
        firstName: Yup.string().required('firstName is Required'), //required là hiển thị dòng lỗi phía dưới của input khi dữ liệu trống
        lastName: Yup.string().required('lastName is Required'), //required là hiển thị dòng lỗi phía dưới của input khi dữ liệu trống
        address: Yup.string().required('address is Required'), //required là hiển thị dòng lỗi phía dưới của input khi dữ liệu trống
        state: Yup.string().required('state is Required'), //required là hiển thị dòng lỗi phía dưới của input khi dữ liệu trống
        country: Yup.string().required('country is Required'),
        city: Yup.string().required('city is Required'),
        pincode: Yup.string().required('pincode is Required'),
        orther: Yup.string().required('orther is Required'),
    });
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName:"",
            address:"",
            state:"",
            country:"",
            pincode:"",
            city:"",
            orther:"",
        },
        validationSchema:userSchema,
        onSubmit: values => {
            // dispatch(login(values))
            setShippingInfo(values)
            // alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <>
            <Meta title="Check Out"/>
            <BreadCrumb title="Check Out"/>

            <Container class1="checkout-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-7">
                        <div className="checkout-left-data">
                            <h3 className="website-name">Apple Store</h3>
                            <nav style={{"--bs-breadcrumb-divider": '>'}} aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link className='text-dark total-price text-decoration-none' to="/cart">Cart</Link></li>
                                    &nbsp; /
                                    <li className="breadcrumb-item active total-price" aria-current="page">Information</li>
                                    &nbsp; /
                                    <li className="breadcrumb-item active total-price" aria-current="page">Shipping</li>
                                    &nbsp; /
                                    <li className="breadcrumb-item active total-price" aria-current="page">Payment</li>
                                </ol>
                            </nav>
                            <h4 className="title total">Contact Information</h4>
                            <p className="user-details total">HuynhLe ( huynhletrong23@gmail.com )</p>
                            <h4 className='mb-3'>Shipping Address</h4>
                            <form onSubmit={formik.handleSubmit} className='d-flex gap-15 flex-wrap justify-content-between' action="">
                                <div className="w-100">
                                    <select 
                                        className='form-control form-select' 
                                        name="country" id=""
                                        onChange={formik.handleChange("country")}
                                        onBlur={formik.handleBlur("country")}
                                        value={formik.values.country}
                                        >
                                        
                                        <option value="" selected disabled>
                                            Select Country  
                                        </option>
                                        <option value="Việt Nam">
                                            Việt Nam 
                                        </option>
                                        <option value="Hàn Quốc">
                                            Hàn Quốc 
                                        </option>
                                        <option value="Pháp">
                                            Pháp   
                                        </option>
                                        <option value="Nhật Bản">
                                            Nhật Bản 
                                        </option>
                                    </select>
                                    <div className="error">
                                        {formik.touched.country && formik.errors.country ? (
                                            <div>{formik.errors.country}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <input 
                                        type="text" 
                                        placeholder='First Name ...' 
                                        name="" 
                                        className='form-control' 
                                        id="" 
                                        onChange={formik.handleChange("firstName")}
                                        onBlur={formik.handleBlur("firstName")}
                                        value={formik.values.firstName}
                                        />
                                    <div className="error">
                                        {formik.touched.firstName && formik.errors.firstName ? (
                                            <div>{formik.errors.firstName}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <input 
                                        type="text" 
                                        placeholder='Last Name ...' 
                                        name="" 
                                        className='form-control' 
                                        id="" 
                                        onChange={formik.handleChange("lastName")}
                                        onBlur={formik.handleBlur("lastName")}
                                        value={formik.values.lastName}
                                        />
                                    <div className="error">
                                        {formik.touched.lastName && formik.errors.lastName ? (
                                            <div>{formik.errors.lastName}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="w-100">
                                    <input 
                                        type="text" name="" 
                                        placeholder='Address' 
                                        className='form-control' 
                                        id="" 
                                        onChange={formik.handleChange("address")}
                                        onBlur={formik.handleBlur("address")}
                                        value={formik.values.address}
                                        />
                                    <div className="error">
                                        {formik.touched.address && formik.errors.address ? (
                                            <div>{formik.errors.address}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="w-100">
                                    <input 
                                        type="text" 
                                        name="" 
                                        placeholder='Apartment, Suite, etc' 
                                        className='form-control' 
                                        id="" 
                                        onChange={formik.handleChange("orther")}
                                        onBlur={formik.handleBlur("orther")}
                                        value={formik.values.orther}
                                        />
                                    <div className="error">
                                        {formik.touched.orther && formik.errors.orther ? (
                                            <div>{formik.errors.orther}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <input 
                                        type="text" 
                                        name="" 
                                        placeholder='City' 
                                        className='form-control' 
                                        id="" 
                                        onChange={formik.handleChange("city")}
                                        onBlur={formik.handleBlur("city")}
                                        value={formik.values.city}
                                        />
                                    <div className="error">
                                        {formik.touched.city && formik.errors.city ? (
                                            <div>{formik.errors.city}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <select 
                                        className='form-control form-select' 
                                        name="" 
                                        id=""
                                        onChange={formik.handleChange("state")}
                                        onBlur={formik.handleBlur("state")}
                                        value={formik.values.state}
                                        >
                                        <option value='' selected disabled>Select State</option>
                                        <option value='Haryana'>Haryana</option>
                                        <option value='Mikazumi'>Mikazumi</option>
                                    </select>
                                    <div className="error">
                                        {formik.touched.state && formik.errors.state ? (
                                            <div>{formik.errors.state}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <input 
                                        type="text" 
                                        name=""
                                        placeholder='Zipcode' 
                                        className='form-control'
                                        id=""
                                        onChange={formik.handleChange("pincode")}
                                        onBlur={formik.handleBlur("pincode")}
                                        value={formik.values.pincode}
                                        />
                                    <div className="error">
                                        {formik.touched.pincode && formik.errors.pincode ? (
                                            <div>{formik.errors.pincode}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="w-100">
                                    <div className="d-flex mb-4 align-items-center justify-content-between">
                                        <Link className='text-dark text-decoration-none' to='/cart'><IoMdArrowBack className='me-2'/>
                                        Return To Cart
                                        </Link>
                                        <Link to='/product' className='button text-decoration-none'>Continue To Shipping</Link>
                                        <button className='button' type="submit" onClick={()=>{
                                            setTouch(true)
                                        }}>Orders</button>
                                    </div>
                                    {
                                        touch==true&& (
                                            <div className='mt-4'>
                                                <Paypal amount={totalAmount+5} payload={{
                                                shippingInfo:shippingInfo,
                                                orderItems:cartState,totalPrice:totalAmount+5}}/>
                                            </div>
                                        )
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="border-bottom py-4">
                            {
                                cartState && cartState?.map((e,index)=>(
                                    <div key={index} className="d-flex gap-10 mb-2 align-items-center">
                                        <div className="w-75 d-flex align-items-center gap-15">
                                            <div className="w-30 position-relative">
                                                <span style={{top:"-10px",right:"-10px",padding:"6px 9px"}} 
                                                className='badge bg-secondary position-absolute text-white rounded-circle'>
                                                    {e?.quantity ? e?.quantity : 0}
                                                </span>
                                                <img className='img-fluid' 
                                                    width={80} src={e?.productId?.images[0]?.url} 
                                                    alt="Product" />
                                            </div>
                                            <div className="w-50">
                                                <h6 className="total-price" style={{fontSize:"13px"}}>{e?.productId?.title}</h6>
                                                <p className="total-price">{e?.productId?.price}</p>
                                            </div>
                                        </div>
                                        <div className="flex-grow-1 w-20">
                                            <h5  className='total'>$ {e?.productId?.price * e?.quantity}</h5>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="border-bottom py-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <p className='total'>SubTotal:</p>
                                <p className='total-price'>$ {totalAmount ? totalAmount : 0}</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <p className='mb-0 total'>Shipping:</p>
                                <p className='mb-0 total-price'>$ 5</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center border-bottom py-4">
                            <h4 className='total'>Total:</h4>
                            <h5 className='total-price'>$ { totalAmount ? totalAmount + 5: 0}</h5>
                        </div> 
                    </div>
                </div>
            </Container>
        </>
    );
}

export default Checkout;
