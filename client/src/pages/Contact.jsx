import React, { useEffect } from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { FaHome } from "react-icons/fa";
import { IoIosCall,IoIosMail,IoMdInformationCircleOutline  } from "react-icons/io";
import Container from '../components/Container';
import {useDispatch,useSelector} from 'react-redux'
import * as yup from 'yup'
import { useFormik} from 'formik'
import { postQr } from '../features/contact/contactSlice';
const Contact = () => {
    const dispatch = useDispatch()
    let userSchema = yup.object().shape({
        email: yup.string().email('Email should be valid').required('Email is Required'), //required là hiển thị dòng lỗi phía dưới của input khi dữ liệu trống
        name: yup.string().required('name is Required'),
        mobile: yup.string().required('mobile is Required'),
        comment: yup.string().required('commet is Required')
    });
     const formik = useFormik({
        initialValues: {
            email: "",
            name:"",
            mobile:"",
            password:"",
            comment:""
        },
        validationSchema:userSchema,
        onSubmit: values => {
            dispatch(postQr(values))
                // alert(JSON.stringify(values, null, 2));
        },
    });
    return (
        <>
            <Meta title="Contact Us"/>
            <BreadCrumb title="Contact Us"/>
            <Container class1="contact-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61349.62160107387!2d108.16550644601251!3d16.04724730286286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219c792252a13%3A0xfc14e3a044436487!2zxJDDoCBO4bq1bmcsIEjhuqNpIENow6J1LCDEkMOgIE7hurVuZywgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1704536891478!5m2!1svi!2s" 
                        width="600" height="450" className='border-0 w-100' allowFullScreen="" 
                        loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>
                    </div>
                    <div className="col-12 mt-5">
                        <div className="contact-inner-wrapper d-flex justify-content-between">
                            <div className="">
                                <h3 className="contact-title mb-4">
                                    Contact
                                </h3>
                                <form action="" onSubmit={formik.handleSubmit} className='d-flex flex-column gap-20'>
                                    <div className="">
                                        <input 
                                            placeholder='Email' 
                                            type="text" 
                                            className='form-control' 
                                            name="" 
                                            id="" 
                                            value={formik.values.email}
                                            onChange={formik.handleChange("email")}
                                            onBlur={formik.handleBlur("email")}
                                            />
                                    </div>
                                    <div className="error">
                                        {formik.touched.email && formik.errors.email ? (
                                            <div>{formik.errors.email}</div>
                                        ) : null}
                                    </div>
                                    <div className="">
                                        <input 
                                        type="text" 
                                        placeholder='Name' 
                                        className='form-control' 
                                        name="" 
                                        id="" 
                                        value={formik.values.name}
                                        onChange={formik.handleChange("name")}
                                        onBlur={formik.handleBlur("name")}
                                        />
                                    </div>
                                    <div className="error">
                                        {formik.touched.name && formik.errors.name ? (
                                            <div>{formik.errors.name}</div>
                                        ) : null}
                                    </div>
                                    <div className="">
                                        <input 
                                        type="text" 
                                        placeholder='Mobile Number' 
                                        className='form-control' 
                                        name="" 
                                        id="" 
                                        value={formik.values.mobile}
                                        onChange={formik.handleChange("mobile")}
                                        onBlur={formik.handleBlur("mobile")}
                                        />
                                    </div>
                                    <div className="error">
                                        {formik.touched.mobile && formik.errors.mobile ? (
                                            <div>{formik.errors.mobile}</div>
                                        ) : null}
                                    </div>
                                    <div className="">
                                        <textarea 
                                        placeholder='Comments' 
                                        name="" 
                                        id="" 
                                        className='w-100 form-control' 
                                        cols="30" 
                                        rows="4"
                                        value={formik.values.comment}
                                        onChange={formik.handleChange("comment")}
                                        onBlur={formik.handleBlur("comment")}
                                        ></textarea>
                                    </div>
                                    <div className="error">
                                        {formik.touched.comment && formik.errors.comment ? (
                                            <div>{formik.errors.comment}</div>
                                        ) : null}
                                    </div>
                                    <div className="">
                                        <button className='button border-0'>
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="">
                                <h3 className="contact-title mb-4">
                                    Get in touch with us
                                </h3>
                                <div className="">
                                    <ul className="list-title ps-0">
                                        <li className='mb-3 d-flex gap-15 align-items-center'>
                                            <FaHome  className='fs-5'/>
                                            <address className='mb-0'>572 Đường 2/9, Quận Hải Châu, TP - Đà Nẵng</address>
                                        </li>
                                        <li className='mb-3 d-flex gap-15 align-items-center'>
                                            <IoIosCall  className='fs-5'/>  
                                            <a href="tel: 0708484603">Tel: 0708484603 </a> 
                                        </li>
                                        <li className='mb-3 d-flex gap-15 align-items-center'>
                                            <IoIosMail className='fs-5'/>
                                            <a href="Email : huynhletrong23@gmail.com">Email : huynhletrong23@gmail.com</a>
                                        </li>
                                        <li className='mb-3 d-flex gap-15 align-items-center'>
                                            <IoMdInformationCircleOutline className='fs-5'/>
                                            <p className='mb-0'>6/1/2025 - 10 Giờ</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default Contact;
