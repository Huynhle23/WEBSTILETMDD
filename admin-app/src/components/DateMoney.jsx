import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrder } from '../features/auth/authSlice';

export default function DateMoney() {
    const dispatch = useDispatch();

    // Get current month and year in YYYY-MM format
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
    const defaultMonth = `${currentYear}-${currentMonth}`;

    const [selectedMonth, setSelectedMonth] = useState(defaultMonth);
    const [monthlyRevenue, setMonthlyRevenue] = useState(0);
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [yearlyRevenue, setYearlyRevenue] = useState(0);

    useEffect(() => {
        dispatch(getAllOrder());
    }, [dispatch]);

    const orderState = useSelector(state => state?.auth?.orders);

    useEffect(() => {
        if (orderState && selectedMonth) {
            calculateMonthlyRevenue(selectedMonth);
        }
    }, [orderState, selectedMonth]);

    useEffect(() => {
        if (orderState && selectedYear) {
            calculateYearlyRevenue(selectedYear);
        }
    }, [orderState, selectedYear]);

    const handleMonthChange = (event) => {
        const selectedDate = event.target.value;
        setSelectedMonth(selectedDate);
    };

    const handleYearChange = (event) => {
        const selectedYear = event.target.value;
        setSelectedYear(selectedYear);
    };

    const calculateMonthlyRevenue = (selectedDate) => {
        const [year, month] = selectedDate.split('-').map(Number);

        const filteredOrders = orderState.filter(order => {
            const orderDate = new Date(order.createdAt);
            return (
                orderDate.getFullYear() === year &&
                orderDate.getMonth() + 1 === month
            );
        });

        const totalRevenue = filteredOrders.reduce((total, order) => {
            const amount = parseFloat(order.totalPrice);
            return total + (isNaN(amount) ? 0 : amount);
        }, 0);
        setMonthlyRevenue(totalRevenue);
    };

    const calculateYearlyRevenue = (selectedYear) => {
        const filteredOrders = orderState.filter(order => {
            const orderDate = new Date(order.createdAt);
            return orderDate.getFullYear() === parseInt(selectedYear);
        });

        const totalRevenue = filteredOrders.reduce((total, order) => {
            const amount = parseFloat(order.totalPrice);
            return total + (isNaN(amount) ? 0 : amount);
        }, 0);
        setYearlyRevenue(totalRevenue);
    };

    return (
        <div className='d-flex flex-column align-items-start w-100 p-3 bg-white rounded'>
            <div className='w-100 mb-4'>
                <p className='desc mb-1'>Doanh thu tháng</p>
                <h6 className='my-2'>
                    Tổng doanh thu theo tháng: <strong>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(monthlyRevenue)}</strong>
                </h6>
                <input type="month" className="form-control" value={selectedMonth} onChange={handleMonthChange} />
            </div>
            <div className='w-100'>
                <p className='desc mb-1'>Doanh thu năm</p>
                <h6 className='my-2'>
                    Tổng doanh thu theo năm: <strong>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(yearlyRevenue)}</strong>
                </h6>
                <input type="number" className="form-control" min="2000" max="2099" step="1" value={selectedYear} onChange={handleYearChange} />
            </div>
        </div>
    );
}
