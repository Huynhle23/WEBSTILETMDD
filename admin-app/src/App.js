import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Resetpassword from './pages/Resetpassword';
import Forgotpassword from './pages/Forgotpassword';
import MainLayout from './components/MainLayout';
import Emquiries from './pages/Emquiries';
import BlogList from './pages/BlogList';
import BlogCatlist from './pages/BlogCatlist';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import ColorList from './pages/ColorList';
import CategoryList from './pages/CategoryList';
import BrandList from './pages/BrandList';
import ProductList from './pages/ProductList';
import AddBlog from './pages/AddBlog';
import AddBlogCat from './pages/AddBlogCat';
import AddColor from './pages/AddColor';
import AddCat from './pages/AddCat';
import AddBrand from './pages/AddBrand';
import AddProduct from './pages/AddProduct';
import AddCoupon from './pages/AddCoupon';
import CouponList from './pages/CouponList';
import ViewEq from './pages/ViewEq';
import ViewOrder from './pages/ViewOrder';
import Ke from './pages/Ke';
function App() {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/reset-password' element={<Resetpassword/>} />
          <Route path='/forgot-password' element={<Forgotpassword/>} />
          {/* bên trong mainlayout có outlet nhận các phần tử con làm children */}
          <Route path='/admin' element={<MainLayout/>}>
            <Route index element={<Dashboard/>} />
            <Route path='enquiries' element={<Emquiries/>} />
            <Route path='enquiries/:id' element={<ViewEq/>} />
            <Route path='orders' element={<Orders/>} />
            <Route path='orders/:id' element={<ViewOrder/>} />
            <Route path='customers' element={<Customers/>} />

            <Route path='add-blog' element={<AddBlog/>} />
            <Route path='add-blog/:id' element={<AddBlog/>} />
            <Route path='blog-list' element={<BlogList/>} />

            <Route path='add-coupon' element={<AddCoupon/>} />
            <Route path='add-coupon/:id' element={<AddCoupon/>} />
            <Route path='list-coupon' element={<CouponList/>} />

            <Route path='blog-category' element={<AddBlogCat/>} />
            <Route path='blog-category/:id' element={<AddBlogCat/>} />
            <Route path='blog-category-list' element={<BlogCatlist/>} />

            <Route path='color' element={<AddColor/>} />
            <Route path='color/:id' element={<AddColor/>} />
            <Route path='list-color' element={<ColorList/>} />

            <Route path='category' element={<AddCat/>} />
            <Route path='category/:id' element={<AddCat/>} />
            <Route path='list-category' element={<CategoryList/>} />

            <Route path='brand' element={<AddBrand/>} />
            <Route path='brand/:id' element={<AddBrand/>} />
            <Route path='list-brand' element={<BrandList/>} />
            
            <Route path='product' element={<AddProduct/>} />
            <Route path='list-product' element={<ProductList/>} />
            <Route path='update-product/:id' element={<AddProduct/>} />
            <Route path='thongke' element={<Ke/>} />
          </Route>
        </Routes>
    </Router>
  );
}

export default App;
