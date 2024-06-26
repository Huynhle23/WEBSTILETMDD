import React,{useEffect} from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import BlogCard from '../components/BlogCard'
import Container from '../components/Container';
import {useDispatch,useSelector} from 'react-redux'
import { getAllblog } from '../features/blogs/blogSlice';
import moment  from 'moment'
const Blogs = () => {
    const blogState = useSelector(state=>state?.blog?.blogs)
    console.log(blogState)
    const dispatch = useDispatch()
    useEffect(()=>{
        getProducts()
    },[])
    const getProducts=()=>{
        dispatch(getAllblog())
    }
    return (
        <>
            <Meta title="Blogs"/>
            <BreadCrumb title="Blogs"/>
            <Container class1="blog-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-3">
                        <div className="filter-card mb-3">
                            <h3 className="filter-title">
                                Find by Categories
                            </h3>
                            <div className="">
                                <ul className="ps-0">
                                    <li>Watch</li>
                                    <li>TV</li>
                                    <li>Camera</li>
                                    <li>Laptop</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="row">
                            {
                                blogState&& (
                                    blogState?.map((e,index)=>(
                                        <div key={index} className="col-6 mb-3">
                                            <BlogCard 
                                                id={e?._id} 
                                                image={e?.images[0]?.url} 
                                                description={e?.description} 
                                                title={e?.title}
                                                date={moment(e?.createdAt).format(
                                                    "MMMM Do, h:mm a"
                                                )}
                                                />
                                        </div>
                                        ))
                                )
                            }
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default Blogs;
