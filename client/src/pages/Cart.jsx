import React, { useEffect, useState } from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import {useDispatch,useSelector} from 'react-redux'
import { deletePrCart, getCart,updateQuantity } from '../features/users/userSlice';

const Cart = () => {
    const dispatch = useDispatch()
    const [productUpdateDetail,setProductUpdateDetail] = useState(null)
    const [totalAmount,setTotalAmount]=useState(null)
    const cartState = useSelector(state=>state.auth?.cartUser)
    useEffect(()=>{
        dispatch(getCart())
    },[cartState])
    useEffect(()=>{
        if(productUpdateDetail !==null){
            let cartDetail = {cartItemId:productUpdateDetail?.cartItemId,newQuantity:productUpdateDetail?.quantity}
            dispatch(updateQuantity(cartDetail))
            setTimeout(()=>{
                dispatch(getCart()) 
            },300)
            
        }
    },[productUpdateDetail])
    const deleteCart=(cartItemId)=>{
        dispatch(deletePrCart(cartItemId))
        setTimeout(()=>{
            dispatch(getCart()) 
        },300)
    }
    useEffect(()=>{
        let sum = 0
        for(let i = 0;i < cartState?.length ;i++){
            sum += (Number(cartState[i]?.quantity * cartState[i]?.price))
            setTotalAmount(sum)
        }
    },[cartState])


    return (
        <>
            <Meta title="Cart"/>
            <BreadCrumb title="Cart"/> 
            <Container class1="cart-wrapper py-5 home-wrapper">
                <div className="row">
                    <div className="col-12">
                        <div className="cart-header py-3 d-flex justify-content-between align-items-center">
                            <h4 className='cart-col-1'>Product</h4>
                            <h4 className='cart-col-2'>Price</h4>
                            <h4 className='cart-col-3'>Quantity</h4>
                            <h4 className='cart-col-4'>Total</h4>
                        </div>
                        {
                            cartState?.map((e,index)=>(
                                <div key={index} className="cart-data py-3 d-flex justify-content-between align-items-center">
                                    <div className="cart-col-1 gap-15 d-flex align-items-center">
                                        <div className="w-25">
                                            <img src={e?.productId?.images[0]?.url} width={80} className='img-fluid' alt="product img" />
                                        </div>
                                        <div className="w-75">
                                            <p >{e?.productId?.title}</p>
                                            <p className='d-flex gap-30'>Color: 
                                                <ul className='colors d-flex flex-wrap gap-10 ps-0 mb-0'>
                                                    <li style={{backgroundColor:e?.color?.title}}></li>
                                                </ul>
                                            </p>
                                            {/* <p >Size: M</p> */}
                                        </div>
                                    </div>
                                    <div className="cart-col-2 gap-15">
                                        <h5 className="price">$ {e?.price}</h5>
                                    </div>
                                    <div className="cart-col-3 gap-15 d-flex align-items-center">
                                        <div className="">
                                            <input 
                                                type="number" 
                                                name="" 
                                                id="" 
                                                min={1} 
                                                value={productUpdateDetail?.quantity ? productUpdateDetail?.quantity : e?.quantity}
                                                onChange={(c)=>setProductUpdateDetail({cartItemId:e?._id,quantity:c.target.value})}
                                                />
                                        </div>
                                        <div className="">
                                            <MdDelete className='text-danger fs-5 ' onClick={()=>{deleteCart(e?._id)}}/>
                                        </div>
                                    </div>
                                    <div className="cart-col-4">
                                        <h5 className="total">$ {e?.productId?.price * e?.quantity}</h5>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="col-12 py-2 mt-4">
                        <div className="d-flex justify-content-between align-items-baseline">
                            <Link className='button text-decoration-none' to='/product'>Continue To Shopping</Link>
                            
                            {
                                ( totalAmount !== null || totalAmount!==0)&&(
                                    <div className="d-flex flex-column align-items-end ">
                                        <h4>SubTotal: $ {totalAmount}</h4>
                                        <p>Taxes and shipping calculated at checkout</p>
                                        <Link className='button text-decoration-none' to='/checkout'>Checkout</Link>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default Cart;
