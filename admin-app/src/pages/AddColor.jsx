import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { createColor, getIdColor, resetState, updateColor } from '../features/color/colorSlice';

let schema = yup.object().shape({
  title: yup.string().required("Title is Required")
});

const AddColor = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation()
    
    const newColor = useSelector((state) => state.color);
    const { isSuccess, isError, isLoading, create,colorName } = newColor;
    const getColorId = location.pathname.split("/")[3]
    useEffect(() => {
        if (getColorId !== undefined) {
            dispatch(getIdColor(getColorId));
        } else {
            dispatch(resetState());
        }
    }, [getColorId]);
    useEffect(() => {
        if (isSuccess && create) {
        toast.success("color Added Successfullly!");
        }
        if (isError) {
        toast.error("Something Went Wrong!");
        }
    }, [isSuccess, isError, isLoading]);

    const formik = useFormik({
        enableReinitialize:true,
        initialValues: {
        title: colorName || "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
        if(getColorId !== undefined){
            const data = {_id : getColorId,colorData : values}
            dispatch(updateColor(data))
            toast.success("Color Updated Successfullly!");
            navigate("/admin/list-color");
        }else{
            dispatch(createColor(values));
            formik.resetForm();
            setTimeout(() => {
            dispatch(resetState())
            navigate('/admin/list-color')
            }, 300);
        }
        },
    });

    return (
        <div>
            <h3 className='mb-4 title'>{getColorId !== undefined ? "Update":"Add"} Color</h3>
            <div className="">
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput 
                        type ="color" 
                        label ="Enter Color"
                        id="color"
                        onchange={formik.handleChange("title")}
                        onBlur={formik.handleBlur("title")}
                        val={formik.values.title}
                        />
                    <div className="error">
                        {formik.touched.title && formik.errors.title}
                    </div>
                    <button type='submit' className='btn btn-success border-0 rounded-3 my-5'>
                      {getColorId !== undefined ? "Update":"Add"} Color
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddColor;
