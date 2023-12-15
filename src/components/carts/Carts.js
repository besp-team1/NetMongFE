import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../style/carts/Carts.css';

const Carts = () => {
    const [cartItems, setCartItems] = useState([]);
    const authToken = localStorage.getItem('token');

    const fetchCartItems = async () => {
        const url = 'http://localhost:9000/api/v1/products/cart';

        try {
        const response = await axios.get(url, {
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
            },
        });
        setCartItems(response.data.data);
        } catch (error) {
        console.error('장바구니 조회 중 오류 발생:', error.message);
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    return (
        <div className="cartPage-container">
            <h1>장바구니</h1>
            {cartItems.map((item, index) => (
                <div key={index}>
                <h2>
                    <Link to={`/products/${item.productId}`}>{item.productName}</Link>
                </h2>                
                <p>가격: {item.price}</p>
                <p>수량: {item.count}</p>
                </div>
            ))}
        </div>
    );
};

export default Carts;
