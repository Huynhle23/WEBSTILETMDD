import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { createCategory, getIdCategory, resetState, updateCategory } from '../features/pcategory/pcategorySlice';

let schema = yup.object().shape({
  title: yup.string().required("Title is Required")
});

const AddCat = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const newCat = useSelector((state) => state.category);
    const { isSuccess, isError, create,categoryName,updateName } = newCat;
    const getCategoryId = location.pathname.split("/")[3]

    useEffect(() => {
      if (getCategoryId !== undefined) {
        dispatch(getIdCategory(getCategoryId));
      } else {
        dispatch(resetState());
      }
    }, [getCategoryId]);
    
    useEffect(() => {
        if (isSuccess && create) {
            toast.success("category Added Successfullly!");
        }
        if (isError) {
            toast.error("Something Went Wrong!");
        }
    }, [isSuccess, isError]);

    const formik = useFormik({
      enableReinitialize:true,
        initialValues: {
        title: categoryName || "",
      },
    validationSchema: schema,
    onSubmit: (values) => {
      if(getCategoryId !== undefined){
        const data = {_id : getCategoryId,categoryData : values}
        dispatch(updateCategory(data))
        toast.success("Category Updated Successfullly!");
        navigate("/admin/list-category");
      }else{
        dispatch(createCategory(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState())
          navigate('/admin/list-category')
        }, 300);
      }
    },
  });
    return (
        <div>
            <h3 className='mb-4 title'>{getCategoryId !== undefined ? "Update":"Add"} Category</h3>
            <div className="">
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput 
                        type ="text" 
                        label ="Enter Category"
                        onchange={formik.handleChange("title")}
                        onBlur={formik.handleBlur("title")}
                        val={formik.values.title}
                        />
                    <div className="error">
                        {formik.touched.title && formik.errors.title}
                    </div>
                    <button type='submit' className='btn btn-success border-0 rounded-3 my-5'>
                      {getCategoryId !== undefined ? "Update":"Add"} Category</button>
                </form>
            </div>
        </div>
    );
}

export default AddCat;
