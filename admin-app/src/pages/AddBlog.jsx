import { React, useEffect, useState } from "react";
import CustomInput from '../components/CustomInput';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getblogCategory, resetState } from "../features/blogcategory/blogcategorySlice";
import { createBlog, getABlog, updateABlog } from "../features/blog/blogSlice";

let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  category: yup.string().required("Category is Required"),
});

const AddBlog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation()
    const [images, setImages] = useState([]);

    const img = [];
    const getBlogId = location.pathname.split("/")[3]
    useEffect(() => {
      if (getBlogId !== undefined) {
        dispatch(getABlog(getBlogId));
        img.push(blogImages)
      } else {
        dispatch(resetState());
      }
    }, [getBlogId]);
    useEffect(() => {
      dispatch(getblogCategory());
    }, []);

    const imgState = useSelector((state) => state?.upload?.images);
    const blogcategory = useSelector(state=>state?.blogcategory?.blogCategories)
    const blogState = useSelector(state=>state?.blog)
    const { isSuccess
        , isError
        ,blogDesc,
        blogCategory
        ,blogImages,
        isLoading
        ,create
        ,blogName, } = blogState;
    useEffect(() => {
      if (isSuccess && create) {
        toast.success("blog Added Successfullly!");
      }
      if (isError) {
        toast.error("Something Went Wrong!");
      }
    }, [isSuccess, isError]);

    imgState.forEach((i) => {
      img.push({
        public_id: i.public_id,
        url: i.url,
      });
    });
    useEffect(() => {
      formik.values.images = img;
    }, [blogImages]);
    const formik = useFormik({
      enableReinitialize:true,
      initialValues: {
        title: blogName||"",
        description: blogDesc||"",
        category: blogCategory||"",
        images: blogImages||"",
      },
      validationSchema: schema,
      onSubmit: (values) => {
        if(getBlogId !== undefined){
          const data = {id : getBlogId, blogData :values }
        dispatch(updateABlog(data))
        toast.success("Blog Updated Successfullly!");
        navigate("/admin/blog-list");
      }else{
        dispatch(createBlog(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState())
          navigate('/admin/blog-list')
        }, 300);
      }
      },
    });
    return (
        <div>
            <h3 className='mb-4 title'>{getBlogId !== undefined ? "Update":"Add"} Blog</h3>
            <div className="">
                <form action="" onSubmit={formik.handleSubmit}>
                    <div className="mt-3">
                        <CustomInput
                          type="text"
                          label="Enter Blog Title"
                          name="title"
                          onchange={formik.handleChange("title")}
                          onBlur={formik.handleBlur("title")}
                          val={formik.values.title}
                        />
                        <div className="error">
                          {formik.touched.title && formik.errors.title}
                        </div>
                    </div>
                    <select 
                        className='form-control py-3 mb-3 mt-3'
                        name="category" 
                        id="category"
                        onChange={formik.handleChange("category")}
                        onBlur={formik.handleBlur("category")}
                        value={formik.values.category}
                        >
                        <option 
                            value="">Select Blog Category</option>
                        {blogcategory?.map((i, j) => {
                          return (
                            <option key={j} value={i.title}>
                              {i.title}
                            </option>
                          );
                        })}
                    </select>
                    <div className="error">
                      {formik.touched.category && formik.errors.category}
                    </div>
                    <ReactQuill 
                      theme="snow"
                      name="description"
                      onChange={formik.handleChange("description")}
                      value={formik.values.description}
                      />
                    <div className="error">
                      {formik.touched.description && formik.errors.description}
                    </div>
                    <div className="bg-white border-1 mt-3 p-5 text-center">
                    <Dropzone
                      onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <section>
                          <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>
                              Drag 'n' drop some files here, or click to select files
                            </p>
                          </div>
                        </section>
                      )}
                    </Dropzone>
                    </div>
                    <div className="showimages d-flex flex-wrap gap-3 mt-3">
                      {imgState?.map((i, j) => {
                        return (
                          <div className=" position-relative" key={j}>
                            <button
                              type="button"
                              onClick={() => dispatch(delImg(i.public_id))}
                              className="btn-close position-absolute"
                              style={{ top: "10px", right: "10px" }}
                            ></button>
                            <img src={i.url} alt="" width={200} height={200} />
                          </div>
                        );
                      })}
                    </div>
                    <button type='submit' className='btn btn-success border-0 rounded-3 my-5'>{getBlogId !== undefined ? "Update":"Add"} blog</button>
                </form>
            </div>
        </div>
    );
};

export default AddBlog;
