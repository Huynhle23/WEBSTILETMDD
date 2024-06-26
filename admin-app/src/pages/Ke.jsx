import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../features/product/productSlice';

export default function Ke() {
  const dispatch = useDispatch();
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [categoryQuantity, setCategoryQuantity] = useState({});

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const productState = useSelector((state) => state.product.products);

  useEffect(() => {
    // Calculate total quantity of all products
    let total = 0;
    const categoryMap = {};

    productState.forEach(product => {
      total += product.quantity;

      // Tính tổng số lượng cho mỗi danh mục
      if (categoryMap[product.category]) {
        categoryMap[product.category] += product.quantity;
      } else {
        categoryMap[product.category] = product.quantity;
      }
    });

    setTotalQuantity(total);
    setCategoryQuantity(categoryMap);
  }, [productState]);

  return (
    <div className="container">
      <style jsx>{`
        .container {
          margin: 20px;
          padding: 20px;
          border-radius: 10px;
          background-color: #f9f9f9;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .header {
          font-size: 24px;
          font-weight: bold;
          color: #333;
          margin-bottom: 20px;
        }

        .statistics {
          font-size: 18px;
          color: #555;
        }

        .categoryItem {
          margin: 10px 0;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          background-color: #fff;
        }
      `}</style>
      <h3 className="header">Statistics</h3>
      <p className="statistics">Total Quantity: {totalQuantity}</p>
      <div>
        {/* Hiển thị tổng số lượng của mỗi danh mục */}
        {Object.entries(categoryQuantity).map(([category, quantity]) => (
          <p key={category} className="categoryItem">
            Total Quantity of {category}: {quantity}
          </p>
        ))}
      </div>
    </div>
  );
}
