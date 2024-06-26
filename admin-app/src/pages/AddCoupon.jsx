import React, { useEffect, useState } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { createCoupons,getIdCoupon,resetState, updateCoupon } from '../features/coupon/couponSlice';


let schema = yup.object().shape({
  name: yup.string().required("name is Required"),
  expiry: yup.date().required("expiry is Required"),
  discount: yup.number().required("discount is Required")
});

const AddCoupon = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const newCoupon = useSelector((state) => state.coupon);
    const { isSuccess, isError,createCoupon,couponName,couponDiscount,couponExpiry } = newCoupon;
    const getCouponId = location.pathname.split("/")[3]
    const changeDateFormet = (date) => {
        const newDate = new Date(date).toLocaleDateString();
        const [month, day, year] = newDate.split("/");
        return [year, month, day].join("-");
    };
    useEffect(() => {
        if (getCouponId !== undefined) {
            dispatch(getIdCoupon(getCouponId));
        } else {
            dispatch(resetState());
        }
    }, [getCouponId]);
    useEffect(() => {
        if (isSuccess && createCoupon) {
        toast.success("Coupon Added Successfullly!");
        }
        if (isError) {
        toast.error("Something Went Wrong!");
        }
    }, [isSuccess, isError]);
    const formik = useFormik({
    initialValues: {
        enableReinitialize:true,
        name: couponName || "",
        expiry: changeDateFormet(couponExpiry) ||"",
        discount: couponDiscount || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if(getCouponId !== undefined){
        const data = {_id : getCouponId,couponData : values}
        dispatch(updateCoupon(data))
        toast.success("Coupon Updated Successfullly!");
        navigate("/admin/list-coupon");
      }else{
        dispatch(createCoupons(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState())
          navigate('/admin/list-coupon')
        }, 300);
      }
    },
  });
    return (
        <div>
            <h3 className='mb-4 title'>{getCouponId !== undefined ? "Update":"Add"} Coupon</h3>
            <div className="">
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput 
                        type ="text" 
                        label ="Enter Coupon"
                        onchange={formik.handleChange("name")}
                        onBlur={formik.handleBlur("name")}
                        val={formik.values.name}
                        />
                    <div className="error">
                        {formik.touched.name && formik.errors.name}
                    </div>
                    <CustomInput 
                        type ="date" 
                        label ="Enter expiry"
                        onchange={formik.handleChange("expiry")}
                        onBlur={formik.handleBlur("expiry")}
                        val={formik.values.expiry}
                        />
                    <div className="error">
                        {formik.touched.expiry && formik.errors.expiry}
                    </div>
                    <CustomInput 
                        type ="number" 
                        label ="Enter discount"
                        onchange={formik.handleChange("discount")}
                        onBlur={formik.handleBlur("discount")}
                        val={formik.values.discount}
                        />
                    <div className="error">
                        {formik.touched.discount && formik.errors.discount}
                    </div>
                    <button type='submit' className='btn btn-success border-0 rounded-3 my-5'>
                        {getCouponId !== undefined ? "Update":"Add"} Coupon
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddCoupon;
