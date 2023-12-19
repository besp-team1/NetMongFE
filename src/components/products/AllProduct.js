import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../style/products/ProductList.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState(''); // 상품 검색
  const [selectedCategory, setSelectedCategory] = useState(''); // 카테고리 검색

  const API_BASE_URL = `${process.env.REACT_APP_HOST_URL}/api/v1/products`; 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/all?pageNumber=${pageNumber}`);
        const { data } = response.data;

        setProducts(data.content);
        setTotalPages(data.totalPages);

        console.log(data.content);
      } catch (error) {
        console.error('상품 목록 불러오기 중 오류 발생:', error.message);
      }
    };

    fetchData();
  }, [pageNumber]);

  const handleProductRegistration = () => {
    console.log('상품 등록 버튼이 클릭되었습니다.');
    navigate('/product');
  };

  const handleProductDetails = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handlePageChange = (newPageNumber) => {
    setPageNumber(newPageNumber);
  };

  // 이름 검색
  const fetchProducts = async (url, isSearch = false) => {
    try {
      const response = await axios.get(url);
      const { data } = response.data;
  
      if (isSearch) {
        setProducts(data);
      } else {
        setProducts(data.content);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error('상품 목록 불러오기 중 오류 발생:', error.message);
    }
  };

  useEffect(() => {
    fetchProducts(`${API_BASE_URL}/all?pageNumber=${pageNumber}`);
  }, [pageNumber]);
  
  const handleSearch = () => {
    fetchProducts(`${API_BASE_URL}/name/${searchTerm}`, true);
  };

  // 카테고리 변경
  const handleInputChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="productList-container">
      <h2>지갑 두둑히 준비 됐멍?</h2>
      <h6>반려견을 위한 마켓에서 안심하고 구매하세요!</h6>
      <button className="ProductRegistBtn" onClick={handleProductRegistration}>상품 등록</button>
      <div className="ProductSearch-container">
        <label className="ProductCategory">
          <select name="category" value={selectedCategory} onChange={handleInputChange}>
            <option value="">카테고리 선택</option>
            <option value="PET_SUPPLIES">반려동물 용품</option>
            <option value="PET_FEED">반려동물 사료</option>
            <option value="PET_CLOTHES">반려동물 의류</option>
            <option value="ETC">기타</option>
          </select>
        </label>
        <input
          type="text"
          placeholder="상품명을 입력하세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="ProductNameBtn" onClick={handleSearch}>검색</button>
      </div>
      <ul className="products-container">
        {products
          .filter(product => selectedCategory ? product.category === selectedCategory : true)
          .map((product, index) => (
            <li key={index} onClick={() => handleProductDetails(product.productId)} style={{cursor: 'pointer'}}>
              {/* <img className="productItem-image" src={product.imageUrl} alt={product.productName} width="100" height="100" /> */}
              <img className="productItem-image" src={`https://my-jw-s3-bucket.s3.ap-northeast-2.amazonaws.com/${product.imageUrl}`} alt="상품 이미지"
              width="100"
              height="100" />
              {/* console.log(src={`${process.env.REACT_APP_HOST_URL}/${product.imageUrl}`}) */}
              <h3 className="productItem-productName">{product.productName}</h3>
              <p className="productItem-price"><span className="label">가격:</span> {product.price}</p>
              <p className="productItem-content"><span className="label">내용:</span> {product.content}</p>
              <p className="productItem-count">
                <span className="label">수량:</span> {product.count > 0 ? product.count : <span className="sold-out">품절</span>}
              </p>
              <p className={`productItem-category productItem-category-${product.category}`}>{product.category}</p>
            </li>
          ))}
      </ul>

      <div className="ProductPagination-container">
        <button onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}>{"<"}</button>
        {Array.from({length: totalPages}, (_, i) => i + 1).map((number) => (
          <button 
            key={number} 
            onClick={() => handlePageChange(number)}
            className={pageNumber === number ? 'active' : ''}
          >
            {number}
          </button>
        ))}
        <button onClick={() => setPage((prevPage) => Math.min(prevPage + 1, totalPages))}>{">"}</button>
      </div>
    </div>
  );
}

export default ProductList;