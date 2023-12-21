import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../style/carts/Carts.css';

const Carts = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0); 
  const [totalPrice, setTotalPrice] = useState(0); 
  const authToken = localStorage.getItem('token');
  const API_BASE_URL = `${process.env.REACT_APP_HOST_URL}/api/v1/products/cart`;

  const fetchCartItems = async () => {
    const url = `${API_BASE_URL}`;

    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });
      setCartItems(response.data.data.map(item => ({ ...item, selected: false })));
    } catch (error) {
      console.error('장바구니 조회 중 오류 발생:', error.message);
    }
  };

  const handleCheckboxChange = (index) => {
    const updatedCartItems = cartItems.map((item, i) => i === index ? { ...item, selected: !item.selected } : item);
    setCartItems(updatedCartItems);

    // 선택된 항목의 개수를 업데이트
    const selectedItems = updatedCartItems.filter(item => item.selected);
    setSelectedCount(selectedItems.length);

    // 선택된 항목의 총 가격을 계산하고 업데이트
    const total = selectedItems.reduce((sum, item) => sum + item.price * item.count, 0);
    setTotalPrice(total);
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <>
      <h2 className="cartH2">장바구니</h2>
      <div className="cartPage-container">
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div key={index} className="cartItemContainer">
              <h2 className="cartPageH2">
                <input
                  className="cartCheckbox"
                  type="checkbox"
                  checked={item.selected}
                  onChange={() => handleCheckboxChange(index)}
                />
                <Link className="productLink" to={`/products/${item.productId}`}>
                  {item.productName}
                </Link>
              </h2>
              <div className="cartDetails">
                <img
                  className="cartImg"
                  src={`${process.env.REACT_APP_IMAGE_URL}/${item.imageUrl}`}
                  alt="상품 이미지"
                  width="100"
                  height="100"
                />
                <div className="priceAndCount">
                  <p>가격: {item.price}</p>
                  <p>수량: {item.count}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="cartP1">주문 내역이 없습니다.</p>
        )}
      </div>
      <div className="cartSummary">
        <p className="cartP">총 선택: {selectedCount}개</p>
        <p className="cartP">총 주문금액: {totalPrice}</p>
      </div>
    </>
  );
  
  
  
};

export default Carts;