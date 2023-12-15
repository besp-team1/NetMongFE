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
      e.preventDefault(); // 이벤트의 기본 동작을 막음
      try {
        const updatedFormData = new FormData();
        updatedFormData.append('productName', formData.productName);
        updatedFormData.append('price', formData.price);
        updatedFormData.append('content', formData.content);
        updatedFormData.append('count', formData.count);
        updatedFormData.append('category', formData.category);
    
        await axios.patch(`http://localhost:9000/api/v1/products/${productId}`, updatedFormData);
        navigate('/api/v1/products'); // 절대 경로를 사용
      } catch (error) {
        console.error('상품 수정 중 오류 발생:', error.message);
      }
    };
    
    return (
      <div className="product-edit-container">
        <h2 className="product-edit-title">상품 수정</h2>
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
                  </label>
                  <label>
                  판매가:
                  <input type="text" name="price" value={formData.price} onChange={handleInputChange} className="edit-input" />
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
                  </label>
              </div>
              <div className="form-right">
                  <label>
                  상품 필수정보:
                  <textarea name="content" value={formData.content} onChange={handleInputChange} className="edit-textarea" />
                  </label>
                  <label>
                  상품 갯수:
                  <textarea name="count" value={formData.count} onChange={handleInputChange} className="edit-textarea" />
                  </label>
              </div>
          </div>
          <div className="productEditButton-group">
          <button
            type="submit"
            className="product-edit-submit-button"
          >
            상품 수정 완료
          </button>
        </div>
        </form>

      </div>
    );
}

export default ProductEdit;
