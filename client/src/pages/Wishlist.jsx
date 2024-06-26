import React, { useEffect } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import { getAllWishList } from "../features/users/userSlice";
import { addToWishList } from "../features/products/productSlice";
import ProductCard from "../components/ProductCard";

const Wishlist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllWishList());
  }, []);

  const wishlist = useSelector((state) => state?.auth?.getWishList?.wishlist); // auth duoc tao ra o ben authSlice

  const removeWishList = (id) => {
    dispatch(addToWishList(id));
    setTimeout(() => {
      dispatch(getAllWishList());
    }, 300);
  };
  return (
    <>
      <Meta title="Wish List" />
      <BreadCrumb title="Wish List" />
      <div className="wishlist-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            {wishlist?.length < 1 && (
              <div className="d-flex align-items-center justify-content-center">
                No data
              </div>
            )}
            <ProductCard data={wishlist} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
