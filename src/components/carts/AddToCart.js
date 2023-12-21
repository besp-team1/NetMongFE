import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/carts/AddToCart.css';

const AddToCart = ({ productId, onProductAdd }) => {
  const [count, setCount] = useState(1);
  const authToken = localStorage.getItem('token');
  const navigate = useNavigate();
  const API_BASE_URL = `${process.env.REACT_APP_HOST_URL}/api/v1/products/cart`; 

  const handleCountChange = (e) => {
    setCount(e.target.value);
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
  
    const url = `${API_BASE_URL}/${productId}`;
    const data = { count: count };
  
    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log('상품이 성공적으로 장바구니에 추가되었습니다:', response.data);
      setCount(1);
  
      const userChoice = window.confirm('장바구니를 조회하시겠습니까?');
      if (userChoice) {
        navigate('/api/v1/products/cart');
  
        const currentCount = localStorage.getItem('cartCount') || 0;
        localStorage.setItem('cartCount', Number(currentCount) + 1);
      }
    } catch (error) {
      
      if (error.response && error.response.status === 409) {
        alert('본인이 등록한 상품은 장바구니에 담을 수 없습니다.');
      } else {
        console.error('장바구니에 상품 추가 중 오류 발생:', error.message);
      }

      if (error.response && error.response.status === 500) {
        alert('품절된 상품입니다. 다음에 이용해주세요.');
      } else {
        console.error('장바구니에 상품 추가 중 오류 발생:', error.message);
      }
    }
  };
  

  return (
    <div className="addToCartForm-container">
      <form onSubmit={handleAddToCart} className="form-container">
        <div className="input-container">
          <input type="number" value={count} onChange={handleCountChange} min="1" />
          <button type="submit">장바구니 추가</button>
        </div>
      </form>
    </div>
  );
};

export default AddToCart;
