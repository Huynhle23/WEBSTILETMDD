import React,{useEffect} from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { Link,useParams } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import blog from '../images/blog-1.jpg'
import Container from '../components/Container';
import {useDispatch,useSelector} from 'react-redux'
import { getABlog } from '../features/blogs/blogSlice';

const SingleBlog = () => {  
    
    const dispatch = useDispatch()
    const {id} = useParams()
    const stateBg = useSelector(state=>state.blog?.aBlog?.updateViews)
    console.log(stateBg)
    useEffect(()=>{
        dispatch(getABlog(id))
    },[id])
    return (
        <>
            <Meta title="Dynamic Blog Name"/>
            <BreadCrumb title="Dynamic Blog Name"/>   

            <Container className="blog-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="single-blog-card">
                            <Link to='/blogs' className='d-flex align-items-center gap-10'>
                                <FaArrowLeft />
                                Go back to Blogs
                            </Link>
                            <h3 className="title">
                                {stateBg?.title}
                            </h3>
                            <img className='img-fluid w-100 my-4' src={stateBg?.images[0]?.url} alt="blog" />
                            <p
                            dangerouslySetInnerHTML={{__html: stateBg?.description.substr(0,70)+"..."}}
                            >
                                
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default SingleBlog;
