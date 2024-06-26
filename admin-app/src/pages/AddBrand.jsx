import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { createBrans, getIdBrand, resetState, updateBrand } from '../features/brand/brandSlice';


let schema = yup.object().shape({
  title: yup.string().required("Title is Required")
});

const AddBrand = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation()
    const newBrand = useSelector((state) => state?.brand);
    const { isSuccess, isError,isLoading ,createBrand,brandName,updateName } = newBrand;
    // info location
    const getBrandId = location.pathname.split("/")[3]


    useEffect(() => {
      if (getBrandId !== undefined) {
        dispatch(getIdBrand(getBrandId));
      } else {
        dispatch(resetState());
      }
    }, [getBrandId]);
  // location id change setup 

    useEffect(() => {
        if (isSuccess && createBrand) {
          toast.success("brand Added Successfullly!");
        }
        if (isError) {
          toast.error("Something Went Wrong!");
        }
    }, [isSuccess, isError]);

    const formik = useFormik({
      enableReinitialize:true,
      initialValues: {
      title: brandName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if(getBrandId !== undefined){
        const data = {_id : getBrandId,brandData : values}
        dispatch(updateBrand(data))
        toast.success("Brand Updated Successfullly!");
        navigate("/admin/list-brand");
      }else{
        dispatch(createBrans(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState())
          navigate('/admin/list-brand')
        }, 300);
      }
    },
  });
    return (
        <div>
            <h3 className='mb-4 title'> {getBrandId !== undefined ? "Update":"Add"} Brand</h3>
            <div className="">
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput 
                        type ="text" 
                        label ="Enter Brand"
                        onchange={formik.handleChange("title")}
                        onBlur={formik.handleBlur("title")}
                        val={formik.values.title}
                        />
                    <div className="error">
                        {formik.touched.title && formik.errors.title}
                    </div>
                    <button type='submit' className='btn btn-success border-0 rounded-3 my-5'>
                      {getBrandId !== undefined ? "Update":"Add"} Brand
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddBrand;
