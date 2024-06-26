import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function ItemsSearch() {
  const ItemsProductSearch = useSelector(state => state?.product?.search);

  return (
    <div className='container'>
      <style>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .product {
          width: calc(25% - 20px); /* Chia 25% width và giảm 20px margin */
          border: 1px solid #e0e0e0;
          border-radius: 10px;
          overflow: hidden;
          position: relative;
          margin-bottom: 20px;
          transition: transform 0.3s ease; /* Hiệu ứng hover */
        }

        .product:hover {
          transform: translateY(-5px); /* Di chuyển lên trên khi hover */
        }

        .product img {
          width: 100%;
          height: 250px; /* Điều chỉnh chiều cao hình ảnh */
          object-fit: cover;
          transition: transform 0.3s ease; /* Hiệu ứng hover */
        }

        .product:hover img {
          transform: scale(1.1); /* Phóng to hình ảnh khi hover */
        }

        .tag {
          background-color: #ff9800;
          color: #fff;
          position: absolute;
          top: 10px;
          right: 10px;
          padding: 5px 10px;
          border-radius: 5px;
          font-size: 14px;
        }

        .product-content {
          padding: 10px;
        }

        .price {
          font-size: 18px;
          font-weight: 600;
          color: #ff9800;
        }

        .no-results {
          text-align: center;
          margin-top: 50px;
          color: #555;
        }
        .sad-face {
          font-size: 50px;
          margin-bottom: 20px;
        }
      `}</style>
      <div className="py-4">
        <h3 className='text-center'>Sản phẩm tìm được</h3>
      </div>
      <div className="d-flex flex-wrap align-items-center justify-content-between py-5">
        {
          ItemsProductSearch?.length > 0 ? (
            ItemsProductSearch?.map((product, index) => (
              <div key={index} className='product'>
                <Link to={`/product/${product?._id}`} className="product-link">
                  <img src={product?.images[0]?.url} alt={product?.title} />
                  <div className="tag">
                    <p>{product?.tags}</p>
                  </div>
                  <div className="product-content">
                    <h6 className='product-title'>{product?.title}</h6>
                    <p className='price'>{product ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product?.price) : "231.000 đ"}</p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>Không tìm thấy sản phẩm liên quan</p>
              <span role="img" aria-label="sad-face" className="sad-face">😢</span>
              <p>Quay lại và thử lại với từ khoá khác nhé!</p>
            </div>
          )
        }
      </div>
    </div>
  )
}
