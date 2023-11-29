import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../style/products/ProductList.css';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 서버에서 상품 목록을 조회하는 GET 요청
        const response = await axios.get('http://localhost:9000/api/v1/products');

        // 서버에서 응답한 데이터를 상태에 설정
        setProducts(response.data.data);
      } catch (error) {
        console.error('상품 목록 불러오기 중 오류 발생:', error.message);
      }
    };

    fetchData();
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  return (
    <div className="productList-container">
      <h2>지갑 두둑히 준비 됐멍?</h2>
      <h6>반려견을 위한 마켓에서 안심하고 구매하세요!</h6>
      <ul className="product-container"> {/* Change to "product-container" */}
        {products.map((product, index) => (
          <li key={index}>
            <h3>{product.productName}</h3>
            <p>가격: {product.price}</p>
            <p>내용: {product.content}</p>
            <p>카테고리: {product.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
  
}

export default ProductList;