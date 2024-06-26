import React from 'react';
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from 'react-router-dom';
import prodCompare from '../images/prodcompare.svg';
import wish from '../images/wish.svg';
import watch from '../images/watch.jpg';
import acc from '../images/acc.jpg';
import addcart from '../images/view.svg';
import view from '../images/add-cart.svg';
import {useDispatch,useSelector} from 'react-redux'
import { addToWishList } from '../features/products/productSlice';
import {toast} from 'react-toastify'

const ProductCard = (props) => {
    const {grid,data} = props
    const dispatch = useDispatch()
    let location = useLocation()
    const adWishList =(id)=>{
        dispatch(addToWishList(id))
        toast.success("Added to wishlist")
    }
    return (
        <>
            {
                data && (
                    data?.map((item,index)=>(
                    <div key={index} className={`${location.pathname == "/product" ? `gr-${grid}` : "col-3"}`}>
                        <div
                            className="product-card position-relative h-100">
                            <div className="wishlist-icon position-absolute">
                                <button className='border-0 bg-transparent' onClick={(e)=>adWishList(item?._id)}>
                                    <img src={wish} alt="wishlist" />
                                </button>
                            </div>
                            <div className="product-image d-flex align-items-center justify-content-center">
                                <img src={item?.images[0].url} className='img-fluid mx-auto' width={160} alt="product image" />
                                <img width={160} src={item?.images[1]?.url ? item?.images[1]?.url : acc} className='img-fluid' alt="product image" />
                            </div>
                            <div className="product-details">
                                <h6 className="brand">{item?.brand}</h6>
                                <h5 className="product-title">
                                    {item?.title}
                                </h5>
                                <ReactStars
                                    count={5}
                                    size={24}
                                    value={item?.totalrating.toString()} 
                                    edit={false} // không cho chỉnh sửa
                                    activeColor="#ffd700"
                                />
                                <p className={`description ${grid===12 ? "d-block" : "d-none"}`}
                                    dangerouslySetInnerHTML={{__html: item?.description.toString()}}
                                    style={{fontSize:"16px"}}
                                >
                                </p>
                                <p className="price">
                                    ${item?.price}
                                </p>
                            </div>
                            <div className="action-bar position-absolute">
                                <div className="d-flex flex-column gap-15">
                                    <button className='border-0 bg-transparent'>
                                        <img src={prodCompare} alt="prodcompare" />
                                    </button>
                                    <button className='border-0 bg-transparent'>
                                        <img src={view} alt="view" />
                                    </button>
                                    <Link to={`/product/${item?._id}`} className='border-0 bg-transparent'>
                                        <img src={addcart} alt="AddCart" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
                )
            }
        </>
    );
}

export default ProductCard;
