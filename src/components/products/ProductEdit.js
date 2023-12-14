import React, { useState} from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

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
    
    const handleEdit = async () => {
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
    <div>
      <h2>상품 수정</h2>
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
                </label>
                <label>
                판매가:
                <input type="text" name="price" value={formData.price} onChange={handleInputChange} />
                </label>
            <label>
                카테고리:
                <input type="text" name="category" value={formData.category} onChange={handleInputChange} />
                </label>
            </div>

            <div className="form-right">
                <label>
                상품 필수정보:
                <textarea name="content" value={formData.content} onChange={handleInputChange} />
                </label>
                <label>
                상품 갯수:
                <textarea name="count" value={formData.count} onChange={handleInputChange} />
                </label>
            </div>
        </div>

      <div className="productButton-group">
        <button
          type="submit"
          className="productSubmit-button"
          onClick={handleEdit}
        >
          상품 수정 완료
        </button>
      </div>
    </div>
  );
}

export default ProductEdit;
