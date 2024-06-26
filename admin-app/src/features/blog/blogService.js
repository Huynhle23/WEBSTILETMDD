// kết nối với backend 
import axios from "axios";
import {base_url} from '../../utils/base_url'
import {config} from '../../utils/axiosconfig';

const getBlog = async()=>{
    const res = await axios.get(`${base_url}blog/get-all-blog`)
    return res.data
}

const createBlog=async(blog)=>{
    const res = await axios.post(`${base_url}blog/create-blog`,blog,config)
    return res.data
}
const updateBlog = async (blog) => {
  const response = await axios.put(
    `${base_url}blog/update-blog/${blog.id}`,
    {
      title: blog.blogData.title,
      description: blog.blogData.description,
      category: blog.blogData.category,
      images: blog.blogData.images,
    },
    config
  );

  return response.data; 
};
const getaBlog = async (id) => {
  const response = await axios.get(`${base_url}blog/get-blog/${id}`, config);

  return response.data;
};

const deleteBlog = async (id) => {
  const response = await axios.delete(`${base_url}blog/del-blog/${id}`, config);

  return response.data;
};
const blogService={
    getBlog,createBlog,updateBlog,deleteBlog,getaBlog
}

export default blogService