import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../style/products/Product.css';

function Product() {
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    productName: '',
    price: '',
    content: '',
    count: '',
    category: '',
    images: null
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newError = {};
    const { productName, price, content, count, category } = formData;
    if (!productName) newError.productName = '상품 이름은 필수 입니다.';
    if (!price) newError.price = '상품 가격은 필수 입니다.';
    if (!content) newError.content = '상품 설명은 필수 입니다.';
    if (!count) newError.count = '상품 갯수는 필수 입니다.';
    if (!category) newError.category = '상품 카테고리는 필수 입니다.';
  
    setError(newError);
    if (Object.keys(newError).length > 0) return;

    try {
      const formDataForUpload = new FormData();
      formDataForUpload.append('productName', formData.productName);
      formDataForUpload.append('price', formData.price);
      formDataForUpload.append('content', formData.content);
      formDataForUpload.append('count', formData.count);
      formDataForUpload.append('category', formData.category);
      if (formData.images) {
        formDataForUpload.append('images', formData.images);
      }
      await axios.post(`${process.env.REACT_APP_HOST_URL}/api/v1/products`, formDataForUpload);
      navigate('/api/v1/products', { replace: true });
    } catch (error) {
      console.error('상품 등록 중 오류 발생:', error.message);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      images: file,
    });
  };
  
  return (
    <div className="product-container">
        <h2>어떤 용품을 판매하실 건가요?</h2>
        <h6>신뢰있는 마켓이 되도록 네트멍에서 검수 후 판매가 이루어집니다.</h6>
        <h6>부당 거래 적발 시, 서비스 이용이 제한됩니다.</h6>
    <form onSubmit={handleSubmit} className="form-container">
        <div className="form-row">
            <div className="form-left">
                <label>
                판매용품:
                <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleInputChange}
                />
                {error && error.productName && <div style={{color: 'red'}}>{error.productName}</div>}
                </label>
                <label>
                판매가:
                <input type="text" name="price" value={formData.price} onChange={handleInputChange} />
                {error.price && <div style={{color: 'red'}}>{error.price}</div>}
                </label>
                <label>
                    카테고리:
                    <select name="category" class="category" value={formData.category} onChange={handleInputChange}>
                      <option value="">카테고리 선택</option>
                      <option value="PET_SUPPLIES">반려동물 용품</option>
                      <option value="PET_FEED">반려동물 사료</option>
                      <option value="PET_CLOTHES">반려동물 의류</option>
                      <option value="ETC">기타</option>
                    </select>
                    {error.category && <div style={{color: 'red'}}>{error.category}</div>}
                  </label>
            </div>

            <div className="form-right">
                <label>
                상품 필수정보:
                <textarea name="content" value={formData.content} onChange={handleInputChange} />
                {error.content && <div style={{color: 'red'}}>{error.content}</div>}
                </label>
                <label>
                  상품 갯수:
                  <input 
                    type="number" 
                    name="count" 
                    value={formData.count} 
                    onChange={handleInputChange} 
                    min="1" 
                  />
                  {error.count && <div style={{color: 'red'}}>{error.count}</div>}
                </label>

                <label>
                이미지등록
                <input type="file" accept="image/*" onChange={handleFileChange} />
                </label>
            </div>
        </div>
        <div className="productButton-group">
            <button type="submit" className="productSubmit-button">상품 등록</button>
        </div>

    </form>

    </div>
  );
}

export default Product;