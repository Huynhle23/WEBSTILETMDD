import React, { useState, useEffect } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "../features/users/userSlice";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from "react-toastify";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [messagee,setMessage] = useState("")

  const userSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email should be valid")
      .required("Email is Required"),
    password: Yup.string().required("Password is Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  const { isSuccess, user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Redirect after successful login
    if (user != null || isSuccess) {
      navigate("/");
      window.location.reload()
    }else{
      toast.error("đăng ký thất bại")
    }
  }, [user, isSuccess, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Row className='py-5'>
        <Col sm={6} style={{ display: 'flex', borderRadius: '50px', overflow: 'hidden', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src="https://i.pinimg.com/474x/72/b8/ac/72b8ac6db205eff6256b118166b24a29.jpg"
            alt="User"
            width="500px"
            style={{ borderRadius: '50px' }}
          />
        </Col>
        <Col sm={6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Meta title="Login" />
          <BreadCrumb title="Login" />

          <Container class1="login-wrapper home-wrapper-2 py-5">
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src="https://inkythuatso.com/uploads/thumbnails/800/2021/12/logo-truong-dai-hoc-kien-truc-da-nang-inkythuatso-01-25-15-58-10.jpg"
                alt="User"
                width="150px"
                style={{ borderRadius: '50px' }}
              />
            </div>
            <div className="row">
              <div className="col-12">
                <div className="auth-card">
                  <h3 className="text-center mb-3">Login</h3>
                  <form
                    onSubmit={formik.handleSubmit}
                    action=""
                    className="d-flex flex-column gap-15"
                  >
                    <CustomInput
                      values={formik.values.email}
                      type="email"
                      name="email"
                      placeholder="Email ..."
                      onChange={formik.handleChange("email")}
                      onBlur={formik.handleBlur("email")}
                    />
                    <div className="error">
                      {formik.touched.email && formik.errors.email ? (
                        <div>{formik.errors.email}</div>
                      ) : null}
                    </div>
                    <div className="password-container" >                    
                        <div className="mb-3">
                            
                                <div className="input-group">
                                    <input 
                                        value={formik.values.password}
                                        onBlur={formik.handleBlur("password")}
                                        placeholder='Password ...'
                                        onChange={formik.handleChange("password")}
                                        type={showPassword ? 'text' : 'password'} 
                                        className="form-control" 
                                        id="exampleInputPassword1" 
                                    />
                                    <button 
                                        className="btn btn-outline-secondary" 
                                        type="button" 
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                          </div>
                    </div>
                    <span style={{color:'red'}}>{messagee}</span>

                    <div className="">
                      <Link className="text-decoration-none" to="/forgot-password">Forgot Password ?</Link>
                      <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                        <button className="button border-0" type="submit">
                          Login
                        </button>
                        <Link to="/signup" className="border-0 button signup text-decoration-none">
                          Sign up
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Container>
        </Col>
      </Row>
    </>
  );
};

export default Login;
