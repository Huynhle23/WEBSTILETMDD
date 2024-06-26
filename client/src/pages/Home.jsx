import React,{useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import Marquee from "react-fast-marquee";
import BlogCard from '../components/BlogCard';
import SpecialProduct from '../components/SpecialProduct';
import Meta from '../components/Meta';
import Container from '../components/Container';
import { services } from '../utils/Data';
import { getAllblog } from '../features/blogs/blogSlice';
import moment from 'moment';
import { getAllProduct } from '../features/products/productSlice';
import { addToWishList } from '../features/products/productSlice';
import wish from '../images/wish.svg';
import prodCompare from '../images/prodcompare.svg';
import acc from '../images/acc.jpg';
import addcart from '../images/view.svg';
import view from '../images/add-cart.svg';
import ReactStars from "react-rating-stars-component";
import {toast} from 'react-toastify'
const Home = () => {
    const blogState = useSelector(state=>state?.blog?.blogs)
    const productState = useSelector(state=>state?.product?.products)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const adWishList =(id)=>{
        dispatch(addToWishList(id))
        toast.success("Added to wishlist")
    }
    useEffect(()=>{
        getBlogs()
        getProducts()
    },[])
    const getBlogs=()=>{
        dispatch(getAllblog())
    }
    const getProducts =()=>{
        dispatch(getAllProduct())
    }
    return (
    <>
        {/* show title */}
        <Meta title="Ecommerce"/> 
        {/* end show title */}
        <Container class1='home-wrapper-1 py-5'>
            <div className="row">
                <div className="col-6">
                    <div className="main-banner position-relative">
                        <img 
                            src="images/main-banner.jpg" 
                            className='img-fluid rounded-3' 
                            alt="main banner" 
                        />
                        <div className="main-banner-content position-absolute">
                            <h4>SUPERCHARGED FOR PROS.</h4>
                            <h5>iPad S13+ Pro</h5>
                            <p>From $999.00 or $41.62/mo</p>
                            <Link className='button'>BUY NOW</Link>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="d-flex gap-10 flex-wrap justify-content-between align-items-center">
                        <div className="small-banner position-relative">
                            <img 
                                src="images/catbanner-01.jpg" 
                                className='img-fluid rounded-3' 
                                alt="small banner" 
                            />
                            <div className="small-banner-content position-absolute">
                                <h4>BEST SALE.</h4>
                                <h5>iPad S13+ Pro</h5>
                                <p>From $999.00 <br />or $41.62/mo</p>
                            </div>
                        </div>

                        <div className="small-banner position-relative">
                            <img 
                                src="images/catbanner-02.jpg" 
                                className='img-fluid rounded-3' 
                                alt="small banner" 
                            />
                            <div className="small-banner-content position-absolute">
                                <h4>NEW ARRIVAL.</h4>
                                <h5>By IPad Air</h5>
                                <p>From $999.00 <br />or $41.62/mo</p>
                            </div>
                        </div>

                        <div className="small-banner position-relative">
                            <img 
                                src="images/catbanner-03.jpg" 
                                className='img-fluid rounded-3' 
                                alt="small banner" 
                            />
                            <div className="small-banner-content position-absolute">
                                <h4>NEW ARRIVAL.</h4>
                                <h5>By IPad Air</h5>
                                <p>From $999.00 <br />or $41.62/mo</p>
                            </div>
                        </div>

                        <div className="small-banner  position-relative">
                            <img 
                                src="images/catbanner-04.jpg" 
                                className='img-fluid rounded-3' 
                                alt="small banner" 
                            />
                            <div className="small-banner-content position-absolute">
                                <h4>NEW ARRIVAL.</h4>
                                <h5>By IPad Air</h5>
                                <p>From $999.00 <br />or $41.62/mo</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
        <Container class1='home-wrapper-2 py-5'>
            <div className="row">
                <div className="col-12">
                    <div className="servies d-flex align-items-center justify-content-between">
                        {
                            services.map((e,index)=>(
                                <div key={index} className="d-flex align-items-center gap-15">
                                    <img src={e.image} alt="servies" />
                                    <div className="">
                                        <h6>{e.title}</h6>
                                        <p className='mb-0'>{e.tagline}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </Container>
        {/* <Container class1='home-wrapper-2 py-5'>
            <div className="row">
                <div className="col-12">
                    <div className="categories d-flex flex-wrap justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <div className="">
                                <h6>Cameras</h6>
                                <p>10 items</p>
                            </div>
                            <img src="images/camera.jpg" alt="camera" />
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="">
                                <h6>Smart Tv</h6>
                                <p>10 items</p>
                            </div>
                            <img src="images/tv.jpg" alt="camera" />
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="">
                                <h6>Smart Watches</h6>
                                <p>10 items</p>
                            </div>
                            <img src="images/headphone.jpg" alt="camera" />
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="">
                                <h6>Music & Gaming</h6>
                                <p>10 items</p>
                            </div>
                            <img src="images/camera.jpg" alt="camera" />
                        </div>

                        <div className="d-flex align-items-center">
                            <div className="">
                                <h6>Cameras</h6>
                                <p>10 items</p>
                            </div>
                            <img src="images/camera.jpg" alt="camera" />
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="">
                                <h6>Smart Tv</h6>
                                <p>10 items</p>
                            </div>
                            <img src="images/tv.jpg" alt="camera" />
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="">
                                <h6>Smart Watches</h6>
                                <p>10 items</p>
                            </div>
                            <img src="images/headphone.jpg" alt="camera" />
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="">
                                <h6>Music & Gaming</h6>
                                <p>10 items</p>
                            </div>
                            <img src="images/camera.jpg" alt="camera" />
                        </div>
                    </div>
                </div>
            </div>
        </Container> */}
        <Container className='featured-wrapper py-5 home-wrapper-2'>
            <div className="row">
                <div className="col-12">
                    <h3 className="section-heading">
                        Featured Collection
                    </h3>
                </div>
                <div className="row">
                {
                    productState && productState?.map((e,index)=>{
                        if(e?.tags === "featured"){
                            return (
                                <div key={index} className="col-3 pb-4">
                                    <div 
                                        className="product-card position-relative h-100">
                                        <div className="wishlist-icon position-absolute">
                                            <button className='border-0 bg-transparent' onClick={()=>adWishList(e?._id)}>
                                                <img src={wish} alt="wishlist" />
                                            </button>
                                        </div>
                                        <div className="product-image d-flex align-items-center justify-content-center">
                                            <img src={e?.images[0]?.url} className='img-fluid mx-auto' width={160} alt="product image" />
                                            <img width={160} src={e?.images[1]?.url ? e?.images[1]?.url : acc} className='img-fluid' alt="product image" />
                                        </div>
                                        <div className="product-details">
                                            <h6 className="brand">{e?.brand}</h6>
                                            <h5 className="product-title">
                                                {e?.title}
                                            </h5>
                                            <ReactStars
                                                count={5}
                                                size={24}
                                                value={e?.totalrating.toString()} 
                                                edit={false} // không cho chỉnh sửa
                                                activeColor="#ffd700"
                                            />
                                            
                                            <p className="price">
                                                ${e?.price}
                                            </p>
                                        </div>
                                        <div className="action-bar position-absolute">
                                            <div className="d-flex flex-column gap-15">
                                                {/* <button className='border-0 bg-transparent'>
                                                    <img src={prodCompare} alt="prodcompare" />
                                                </button>
                                                <button className='border-0 bg-transparent'>
                                                    <img 
                                                        // onClick={()=>navigate(`/product/${e?._id}`)} 
                                                        src={view} 
                                                        alt="view" />
                                                </button> */}
                                                <button className='border-0 bg-transparent'>
                                                    <img 
                                                        onClick={()=>navigate(`/product/${e?._id}`)} 
                                                        src={addcart} 
                                                        alt="AddCart" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            </div>
            </div>
        </Container>
        <Container class1='famous-wrapper py-5 home-wrapper-2'>
            <div className="row">
                <div className="col-3">
                    <div className="famous-card position-relative" style={{backgroundColor:"#000"}}>
                        <div className="famous-content position-absolute">
                            <h5 className="text-white">Big Screen</h5>
                            <h6 className="text-white">Smart Watch Series 7</h6>
                            <p className='text-white'>From $399 or $16,62/mo. For 24 mo </p>
                        </div>
                        <img src="images/famous-1.jpg" className='img-fluid' alt="famous"/>
                    </div>
                </div>
                <div className="col-3">
                    <div className="famous-card position-relative">
                        <div className="famous-content position-absolute">
                            <h5 className="">Smart Watch</h5>
                            <h6 className="">Smart Watch Series 8 utra</h6>
                            <p>From $399 or $16,62/mo. For 24 mo </p>
                        </div>
                        <img src="images/famous-02.jpg" className='img-fluid imgs' alt="famous"/>
                    </div>
                </div>
                <div className="col-3">
                    <div className="famous-card position-relative">
                        <div className="famous-content position-absolute">
                            <h5 className="">Smart Phone</h5>
                            <h6 className="">Smart Phone 15 Pro Max</h6>
                            <p>From $399 or $16,62/mo. For 24 mo </p>
                        </div>
                        <img src="images/famous-05.jpg" className='img-fluid imgs' alt="famous"/>
                    </div>
                </div>
                <div className="col-3">
                    <div className="famous-card position-relative">
                        <div className="famous-content position-absolute">
                            <h5 className="">Smart Watch</h5>
                            <h6 className="">Smart Watch Series 10</h6>
                            <p>From $399 or $16,62/mo. For 24 mo </p>
                        </div>
                        <img src="images/famous-04.jpg" className='img-fluid imgs' alt="famous"/>
                    </div>
                </div>
            </div>
        </Container>
        <Container class1='special-wrapper py-5 home-wrapper-2'>
            <div className="row">
                <div className="col-12">
                    <h3 className="section-heading">
                        Special Products
                    </h3>
                </div>
            </div>
            <div className="row">
                {
                    productState && productState?.map((e,index)=>{
                        if(e?.tags === "special"){
                            return <SpecialProduct 
                                        key={index}
                                        id={e?._id}
                                        title={e?.title}
                                        brand={e?.brand}
                                        price={e?.price}
                                        images={e?.images[0]?.url}
                                        totalRating={e?.totalrating?.toString()}
                                        sold={e?.sold}
                                        quantity={e?.quantity}
                                        />
                        }
                    })
                }
            </div>
        </Container>
        <Container class1='popular-wrapper py-5 home-wrapper-2'>
            <div className="row">
                <div className="col-12">
                    <h3 className="section-heading">
                        Our Popular Products
                    </h3>
                </div>
            </div>
            <div className="row">
                {
                    productState && productState?.map((e,index)=>{
                        if(e?.tags === "popular"){
                            return (
                                <div key={index} className="col-3 pb-4">
                                    <div 
                                        className="product-card position-relative h-100">
                                        <div className="wishlist-icon position-absolute">
                                            <button className='border-0 bg-transparent' onClick={()=>adWishList(e?._id)}>
                                                <img src={wish} alt="wishlist" />
                                            </button>
                                        </div>
                                        <div className="product-image d-flex align-items-center justify-content-center">
                                            <img src={e?.images[0].url} className='img-fluid mx-auto' width={160} alt="product image" />
                                            <img width={160} src={e?.images[1]?.url ? e?.images[1]?.url : acc} className='img-fluid' alt="product image" />
                                        </div>
                                        <div className="product-details">
                                            <h6 className="brand">{e?.brand}</h6>
                                            <h5 className="product-title">
                                                {e?.title}
                                            </h5>
                                            <ReactStars
                                                count={5}
                                                size={24}
                                                value={e?.totalrating.toString()} 
                                                edit={false} // không cho chỉnh sửa
                                                activeColor="#ffd700"
                                            />
                                            
                                            <p className="price">
                                                ${e?.price}
                                            </p>
                                        </div>
                                        <div className="action-bar position-absolute">
                                            <div className="d-flex flex-column gap-15">
                                                {/* <button className='border-0 bg-transparent'>
                                                    <img src={prodCompare} alt="prodcompare" />
                                                </button>
                                                <button className='border-0 bg-transparent'>
                                                    <img src={view} alt="view" />
                                                </button> */}
                                                <button className='border-0 bg-transparent'>
                                                    <img 
                                                        onClick={()=>navigate(`product/${e?._id}`)}
                                                        src={addcart} 
                                                        alt="AddCart" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            </div>
        </Container>
        {/* run brand */}
        <Container class1='marque-wrapper home-wrapper-2 py-5'>
            <div className="row"> 
                <div className="col-12">
                    <div className="marquee-inner-wrapper card-wrapper">
                        <Marquee  className='d-flex'>
                            {/* my component */}
                            <div className="mx-4 w-25">
                                <img src="images/brand-01.png" alt="brand" />
                            </div>
                            <div className="mx-4 w-25">
                                <img src="images/brand-02.png" alt="brand" />
                            </div>
                            <div className="mx-4 w-25">
                                <img src="images/brand-03.png" alt="brand" />
                            </div>
                            <div className="mx-4 w-25">
                                <img src="images/brand-04.png" alt="brand" />
                            </div>
                            <div className="mx-4 w-25">
                                <img src="images/brand-05.png" alt="brand" />
                            </div>
                            <div className="mx-4 w-25">
                                <img src="images/brand-06.png" alt="brand" />
                            </div>
                            <div className="mx-4 w-25">
                                <img src="images/brand-07.png" alt="brand" />
                            </div>
                                <div className="mx-4 w-25">
                                <img src="images/brand-08.png" alt="brand" />
                            </div>
                        </Marquee>
                    </div>
                </div>
            </div>
        </Container>
        <Container class1='blog-wrapper py-5 home-wrapper-2'>
            <div className="row">
                <div className="col-12">
                    <h3 className="section-heading">
                        Our Latest Blogs
                    </h3>
                </div>
            </div>
            <div className="row">
                {
                    blogState?.length > 0 && blogState?.map((e,index)=>(
                        <div className="col-3" key={index}>
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
                }
            </div>
        </Container>
    </>
    );
}

export default Home;
