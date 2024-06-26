import React, { useState, useEffect } from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../features/users/userSlice';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {toast} from "react-toastify"
const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    let userSchema = Yup.object().shape({
        firstname: Yup.string().required('Firstname is Required'),
        lastname: Yup.string().required('Lastname is Required'),
        email: Yup.string().email('Email should be valid').required('Email is Required'),
        mobile: Yup.string().required('Mobile is Required'),
        password: Yup.string().required('Password is Required')
    });

    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            email: "",
            mobile: "",
            password: ""
        },
        validationSchema: userSchema,
        onSubmit: values => {
            dispatch(register(values));
        },
    });

    const { ris, isSuccess } = useSelector(state => state.auth);

    useEffect(() => {
        if (ris !== null || isSuccess) {
            navigate('/login');
        }else{
            toast.error("đăng ký thất bại")
        }
    }, [ris, isSuccess, navigate]);

    return (
        <>
            <Row className='py-5'>
                <Col sm={6} style={{ display: 'flex', borderRadius: '50px', overflow: 'hidden', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <img
                        src="https://i.pinimg.com/474x/16/89/36/168936e3d4b366d2388ea458ca429b7c.jpg"
                        alt="User"
                        width="500px"
                        style={{ borderRadius: '50px' }}
                    />
                </Col>
                <Col sm={6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Meta title="Sign Up" />
                    <BreadCrumb title="Sign Up" />

                    <Container class1="login-wrapper home-wrapper-2 py-5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img
                                src="https://inkythuatso.com/uploads/thumbnails/800/2021/12/logo-truong-dai-hoc-kien-truc-da-nang-inkythuatso-01-25-15-58-10.jpg"
                                alt="User"
                                width="150px"
                                style={{ borderRadius: '50px' }}
                            />
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="auth-card">
                                    <h3 className="text-center mb-3">Sign Up</h3>
                                    <form onSubmit={formik.handleSubmit} action="" className='d-flex flex-column gap-15'>
                                        <CustomInput
                                            values={formik.values.firstname}
                                            type="text"
                                            name='firstname'
                                            placeholder='First name ...'
                                            onChange={formik.handleChange("firstname")}
                                            onBlur={formik.handleBlur("firstname")}
                                        />
                                        <div className="error">
                                            {formik.touched.firstname && formik.errors.firstname ? (
                                                <div>{formik.errors.firstname}</div>
                                            ) : null}
                                        </div>
                                        <CustomInput
                                            values={formik.values.lastname}
                                            type="text"
                                            name='lastname'
                                            placeholder='Last Name ...'
                                            onChange={formik.handleChange("lastname")}
                                            onBlur={formik.handleBlur("lastname")}
                                        />
                                        <div className="error">
                                            {formik.touched.lastname && formik.errors.lastname ? (
                                                <div>{formik.errors.lastname}</div>
                                            ) : null}
                                        </div>
                                        <CustomInput
                                            values={formik.values.email}
                                            type="email"
                                            name='email'
                                            placeholder='Email ...'
                                            onChange={formik.handleChange("email")}
                                            onBlur={formik.handleBlur("email")}
                                        />
                                        <div className="error">
                                            {formik.touched.email && formik.errors.email ? (
                                                <div>{formik.errors.email}</div>
                                            ) : null}
                                        </div>
                                        <CustomInput
                                            values={formik.values.mobile}
                                            type="mobile"
                                            name='mobile'
                                            placeholder='Mobile ...'
                                            onChange={formik.handleChange("mobile")}
                                            onBlur={formik.handleBlur("mobile")}
                                        />
                                        <div className="error">
                                            {formik.touched.mobile && formik.errors.mobile ? (
                                                <div>{formik.errors.mobile}</div>
                                            ) : null}
                                        </div>
                                        <div className="mb-3">
                                            
                                            <div className="input-group">
                                                <input
                                                    value={formik.values.password}
                                                    onBlur={formik.handleBlur("password")}
                                                    placeholder='Password ...'
                                                    onChange={formik.handleChange("password")}
                                                    type={showPassword ? 'text' : 'password'}
                                                    className="form-control"
                                                    id="exampleInputPassword1"
                                                />
                                                <button
                                                    className="btn btn-outline-secondary"
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={showPassword ? faEyeSlash : faEye}
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="error">
                                            {formik.touched.password && formik.errors.password ? (
                                                <div>{formik.errors.password}</div>
                                            ) : null}
                                        </div>
                                        <div className="">
                                            <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                                                <button className='button border-0'>Sign up</button>
                                                <Link to="/login" className="border-0 button signup text-decoration-none">
                                                    Login
                                                </Link>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Container>
            <ToastContainer/>

                </Col>

            </Row>
        </>
    );
}

export default Signup;
