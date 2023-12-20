import React, { useState} from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../style/products/ProductEdit.css';

function ProductEdit() {
  const [formData, setFormData] = useState({
    productName: '',
    price: '',
    category: '',
    content: '',
    count: 0
  });

  const [error, setError] = useState({});

  const { productId } = useParams();
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: name === 'price' || name === 'count' 
        ? Number(value)
        : value
    }));
  };

  const handleEdit = async (e) => {
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
      const updatedFormData = new FormData();
      updatedFormData.append('productName', formData.productName);
      updatedFormData.append('price', formData.price);
      updatedFormData.append('content', formData.content);
      updatedFormData.append('count', formData.count);
      updatedFormData.append('category', formData.category);
  
      const authToken = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
        },
      };
  
      await axios.patch(`${process.env.REACT_APP_HOST_URL}/api/v1/products/${productId}`, updatedFormData, config);
      navigate('/api/v1/products');
    } catch (error) {
      if (error.response && error.response.status === 500) {
        alert('이용 권한이 없습니다.');
      } else {
        console.error('상품 수정 중 오류 발생:', error.message);
      }
    }
  };

  return (
    <div className="product-edit-container">
      <h2 className="product-edit-title">상품 수정</h2>
      <h6 className="product-edit-title">품질과 신뢰성 유지를 위해, 상품 정보를 지속적으로 최신화해주세요.</h6>
      <h6 className="product-edit-title">부정확한 정보 입력 시, 서비스 이용에 제한이 있을 수 있습니다.</h6>
      <form className="product-edit-form-container" onSubmit={handleEdit}>
        <div className="form-row">
          <div className="form-left">
            <label>
              판매용품:
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                className="edit-input"
              />
              {error.productName && <div style={{color: 'red'}}>{error.productName}</div>}
            </label>
            <label>
              판매가:
              <input type="text" name="price" value={formData.price} onChange={handleInputChange} className="edit-input" />
              {error.price && <div style={{color: 'red'}}>{error.price}</div>}
            </label>
            <label>
              카테고리:
              <select name="category" value={formData.category} onChange={handleInputChange} className="edit-input">
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
              <textarea name="content" value={formData.content} onChange={handleInputChange} className="edit-textarea" />
              {error.content && <div style={{color: 'red'}}>{error.content}</div>}
            </label>
            <label>
                  수량:
                  <input 
                    type="number" 
                    name="count" 
                    value={formData.count} 
                    onChange={handleInputChange} 
                    min="0" 
                  />
                  {error.count && <div style={{color: 'red'}}>{error.count}</div>}
                </label>
          </div>
        </div>
        <div className="productEditButton-group">
          <button type="submit" className="product-edit-submit-button">상품 수정 완료</button>
        </div>
      </form>
    </div>
  );

}

export default ProductEdit;
