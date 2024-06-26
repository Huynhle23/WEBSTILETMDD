import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import {Link, useNavigate} from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useDispatch,useSelector} from 'react-redux'
import { login } from '../features/auth/authSlice';



const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let userSchema = Yup.object().shape({
        email: Yup.string().email('Email should be valid').required('Email is Required'), //required là hiển thị dòng lỗi phía dưới của input khi dữ liệu trống
        password: Yup.string().required('Passsword is Required')
    });

    const formik = useFormik({
    initialValues: {
        email: "",
        password:""
    },
    validationSchema:userSchema,
    onSubmit: values => {
        dispatch(login(values))
            //alert(JSON.stringify(values, null, 2));
        },
    });

    const {user,isLoading,isError,isSeccess,message} = useSelector(state=>state.auth)// auth duoc tao ra o ben authSlice 
    console.log("mess",message)
    useEffect(()=>{
        // login thanh cong thi chuyen trang
        if(!user == null || isSeccess){
            navigate('admin')
            window.location.reload();          
        }
    },[user,isLoading,isError,isSeccess,message])
    return (
        <div style={{background:"#ffd333",minHeight:"100vh"}} className='py-5'>
            <br /><br /><br /><br /><br />
            <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
                <h3 className='text-center title'>LOGIN</h3>
                <p className='text-center'>Login to your account to continue</p>
                <div className="error text-center">
                    {message =="Rejected" ? "You are not an admin" : ""}
                </div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput 
                        name="email"
                        type="text" 
                        label='Email address...' 
                        i_id ="email" 
                        val={formik.values.email}
                        onchange={formik.handleChange("email")}
                        // onBlur={formik.handleChange("email")}
                        />
                    {/* hiển thị lỗi */}
                    <div className="error">
                        {formik.touched.email && formik.errors.email ? (
                            <div>{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <CustomInput
                        name="password"
                        type="password" 
                        label='Password...' 
                        i_id ="pass" 
                        val={formik.values.password}
                        onchange={formik.handleChange("password")}
                        />
                    {/* hiển thị lỗi */}
                    <div className="error">
                        {formik.touched.password && formik.errors.password ? (
                        <div>{formik.errors.password}</div>
                        ) : null}
                    </div>
                    <div className="mb-3 text-end">
                        <Link 
                            to='/forgot-password' 
                            className=''
                        >
                            Forgot Password
                        </Link>
                    </div>
                    <button
                        className='border-0 px-3 py-2 text-center text-decoration-none fs-5 text-white fw-bold w-100' 
                        type='submit' 
                        style={{background:"#ffd333"}}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
