import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { createBlogCate, getABlogCat, resetState, updateABlogCat } from '../features/blogcategory/blogcategorySlice';


let schema = yup.object().shape({
  title: yup.string().required("Title is Required")
});
const AddBlogCat = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const newBlogCategory = useSelector((state) => state.blogcategory);
    const { isSuccess,isLoading, isError, create,blogCategoryName } = newBlogCategory;
    const getBlogCategoryId = location.pathname.split("/")[3]
    useEffect(() => {
      if (getBlogCategoryId !== undefined) {
        dispatch(getABlogCat(getBlogCategoryId));
      } else {
        dispatch(resetState());
      }
    }, [getBlogCategoryId]);
    useEffect(() => { 
        if (isSuccess && create) {
            toast.success("Blog Category Added Successfullly!");
        }
        if (isError) {
            toast.error("Something Went Wrong!");
        }
    }, [isSuccess, isError]);

    const formik = useFormik({
      enableReinitialize:true,
      initialValues: {
        title: blogCategoryName|| "",
      },
    validationSchema: schema,
    onSubmit: (values) => {
      const data = { _id: getBlogCategoryId, blogcategoryData: values };
      if (getBlogCategoryId !== undefined) {
        dispatch(updateABlogCat(data));
        dispatch(resetState());
        toast.success("Blog category Updated Successfullly!");
        navigate("/admin/blog-category-list");
      } else {
        dispatch(createBlogCate(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
          navigate("/admin/blog-category-list");
        }, 300);
      }
    },
  });
    return (
        <div>
            <h3 className='mb-4 title'>{getBlogCategoryId !== undefined ? "Update":"Add"} Blog Category</h3>
            <div className="">
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput 
                        type ="text" 
                        label ="Enter blog category"
                        onchange={formik.handleChange("title")}
                        onBlur={formik.handleBlur("title")}
                        val={formik.values.title}
                        />
                    <div className="error">
                        {formik.touched.title && formik.errors.title}
                    </div>                    
                    <button type='submit' className='btn btn-success border-0 rounded-3 my-5'>
                      {getBlogCategoryId !== undefined ? "Update":"Add"} blog Category</button>
                </form>
            </div>
        </div>
    );
}

export default AddBlogCat;
