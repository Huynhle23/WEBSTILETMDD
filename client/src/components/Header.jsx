import React, { useEffect, useState } from "react";
import { NavLink, Link,useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import compare from "../images/compare.svg";
import wishlist from "../images/wishlist.svg";
import cart from "../images/cart.svg";
import user from "../images/user.svg";
import menu from "../images/menu.svg";
import { useDispatch, useSelector } from "react-redux";
import {searchInput} from '../features/products/productSlice.js'

const Header = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.auth?.cartUser);
  const CustomerUser = useSelector((state) => state?.auth?.user);
  const [totalAmount, setTotalAmount] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Add search query state
  const [values, setValues] = useState();
  const navigate=useNavigate()

  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < cartState?.length; i++) {
      sum += Number(cartState[i]?.quantity * Number(cartState[i]?.price));
      setTotalAmount(sum);
    }
  }, [cartState]);

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      
    }
  };

  const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(searchInput(values.keyword))
		navigate('/search')
	};

  return (
    <>
      { 
        window.location.pathname.startsWith("/login") || window.location.pathname.startsWith("/signup") ? (""):(
        <>
          <header className="header-top-strip py-3">
            <div className="container-xxl">
              <div className="row">
                <div className="col-6">
                  <p className="text-white mb-0">
                    Free Shipping Over $100 & Free Returns
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-end text-white mb-0">
                    Hotline:{" "}
                    <Link className="text-white" to="tel: 0708484603" style={{ textDecoration: "none" }}>
                      0708484603
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </header>
          <header className="header-upper py-3">
            <div className="container-xxl">
              <div className="row align-items-center">
                <div className="col-2">
                  <h2>
                    <Link to="/" className="text-white" style={{ textDecoration: "none" }}>
                      Apple Store
                    </Link>
                  </h2>
                </div>
                <div className="col-5">
                  <div className="input-group">
                  <form onSubmit={handleSubmit} className="d-flex "> 
                  <input
                      type="text"
                      className="form-control py-2"
                      placeholder="Search Product Here..."
                      aria-label="Search Product Here..."
                      aria-describedby="basic-addon2"
                      onChange={(e) => setValues({ ...values, keyword: e.target.value })}
                    />
                    <button className="input-group-text p-2"  type="submit" id="basic-addon2">
                      <BsSearch className="fs-4" />
                    </button>
                  </form>
                    
                  </div>
                </div>
                <div className="col-5">
                  <div className="header-upper-links d-flex align-items-center justify-content-between">
                    <div className="">
                      <Link
                        to="/compare-product"
                        className="d-flex align-items-center gap-10 text-white text-decoration-none"
                      >
                        <img src={compare} alt="Compare" />
                        <p className="mb-0">
                          Compare <br /> Products
                        </p>
                      </Link>
                    </div>
                    <div className="">
                      <Link
                        to="/wishlist"
                        className="d-flex align-items-center gap-10 text-white" style={{ textDecoration: "none" }}
                      >
                        <img src={wishlist} alt="WishList" />
                        <p className="mb-0">
                          Favourite <br /> WishList
                        </p>
                      </Link>
                    </div>
                    {CustomerUser !== null ? (
                      <div className="dropdown">
                        <div
                          className="d-flex align-items-center gap-10 text-white dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <img src={user} />
                          <p className="mb-0">
                            {CustomerUser?.firstname + " " + CustomerUser?.lastname}
                          </p>
                          <ul className="dropdown-menu">
                            <li>
                              <p
                                className="mb-0 dropdown-item"
                                onClick={() => {
                                  sessionStorage.clear();
                                  window.location.reload();
                                }}
                              >
                                Đăng xuất
                              </p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <div className="">
                        <Link
                          to="/login"
                          className="d-flex align-items-center gap-10 text-white" style={{ textDecoration: "none" }}
                        >
                          <img src={user} />
                          <p className="mb-0">
                            Log in <br /> My Account
                          </p>
                        </Link>
                      </div>
                    )}
                    <div className="">
                      <Link
                        to="/cart"
                        className="d-flex align-items-center gap-10 text-white" style={{ textDecoration: "none" }}
                      >
                        <img src={cart} alt="Cart" />
                        <div className="d-flex flex-column gap-10">
                          <span className="badge bg-white text-dark">
                            {cartState?.length ? cartState?.length : 0}
                          </span>
                          <p className="mb-0">$ {totalAmount ? totalAmount : 0}</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <header className="header-bottom py-3">
            <div className="container-xxl">
              <div className="row">
                <div className="col-12">
                  <div className="menu-bottom d-flex align-items-center gap-30">
                    <div>
                      <div className="dropdown">
                        <button
                          className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <img src={menu} />
                          <span className="me-5 d-inline-block">
                            Shop Categories
                          </span>
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <Link
                              className="dropdown-item text-white"
                              to="/myorders"
                              style={{ textDecoration: "none" }}
                            >
                              My Orders
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item text-white" to="#" style={{ textDecoration: "none" }}>
                              Another action
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item text-white" to="#" style={{ textDecoration: "none" }}>
                              Something else here
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="menu-links">
                      <div className="d-flex align-items-center gap-15">
                        <NavLink to="/" style={{ textDecoration: "none" }}>Home</NavLink>
                        <NavLink to="/product" style={{ textDecoration: "none" }}>Our Store</NavLink>
                        <NavLink to="/blogs" style={{ textDecoration: "none" }}>Blogs</NavLink>
                        <NavLink to="/contact" style={{ textDecoration: "none" }}>Contact</NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
        </>
      )}
    </>
  );
};

export default Header;
