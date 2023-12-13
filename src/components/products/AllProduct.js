import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../style/products/ProductList.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1); // Track the current page number
  const [totalPages, setTotalPages] = useState(1); // Track the total number of pages
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data for the specified page
        const response = await axios.get(`http://localhost:9000/api/v1/products/all?pageNumber=${pageNumber}`);
        const { data } = response.data;

        // Update the state with the fetched data
        setProducts(data.content);
        setTotalPages(data.totalPages);

        console.log(data.content);
      } catch (error) {
        console.error('상품 목록 불러오기 중 오류 발생:', error.message);
      }
    };

    fetchData();
  }, [pageNumber]); // Re-run the effect when the pageNumber changes

  const handleProductRegistration = () => {
    console.log('상품 등록 버튼이 클릭되었습니다.');
    navigate('/product');
  };

  const handleProductDetails = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handlePageChange = (newPageNumber) => {
    // Update the page number and trigger a new data fetch
    setPageNumber(newPageNumber);
  };

  return (
    <div className="productList-container">
      <h2>지갑 두둑히 준비 됐멍?</h2>
      <h6>반려견을 위한 마켓에서 안심하고 구매하세요!</h6>

      <button onClick={handleProductRegistration}>상품 등록</button>

      <ul className="products-container">
        {products.map((product, index) => (
          <li key={index}>
            <h3>{product.productName}</h3>
            <img src={product.imageUrl} alt={product.productName} width="100" height="100" />
            <p>가격: {product.price}</p>
            <p>내용: {product.content}</p>
            <p>상품 갯수: {product.count}</p>
            <p>카테고리: {product.category}</p>
            <button onClick={() => handleProductDetails(product.productId)}>상세 보기</button>
          </li>
        ))}
      </ul>

      {/* Basic pagination controls */}
      <div>
        <button onClick={() => handlePageChange(pageNumber - 1)} disabled={pageNumber === 1}>
          이전 페이지
        </button>
        <span> Page {pageNumber} of {totalPages} </span>
        <button onClick={() => handlePageChange(pageNumber + 1)} disabled={pageNumber === totalPages}>
          다음 페이지
        </button>
      </div>
    </div>
  );
}

export default ProductList;
