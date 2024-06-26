import React from 'react';
import {toast} from 'react-toastify'

const Color = (props) => {
    const { colorData,setColor } = props
    return (
        <>
            <ul className='colors d-flex flex-wrap gap-10 ps-0 mb-0'>
                {
                    colorData && colorData?.map((e,index)=>(
                        <li onClick={()=>{
                            setColor(e?._id)
                            toast.success("Đã chọn màu " + e?.title)
                        }} style={{backgroundColor:e?.title}} key={index}></li>
                    ))
                }
            </ul>
        </>
    );
}

export default Color;
