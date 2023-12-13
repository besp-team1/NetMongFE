import React, { useState, useEffect } from 'react';
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
    
      // 상품 데이터 불러오기
      useEffect(() => {
        const fetchProduct = async () => {
            try {
                const config = {
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  }
                };
            
                const formData = new URLSearchParams();
                for (let key in formData) {
                  formData.append(key, formData[key]);
                }
            
                await axios.patch(`http://localhost:9000/api/v1/products/${productId}`, formData, config);
                navigate(`api/v1/products`);
              } catch (error) {
                console.error('상품 수정 중 오류 발생:', error.message);
              }
        };
        fetchProduct();
    }, [productId]);
    
    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.name === 'price' || event.target.name === 'count' 
                ? Number(event.target.value)
                : event.target.name === 'category'
                ? { name: event.target.value } // 'category' 필드를 객체로 처리
                : event.target.value
        });
    };
    
     const handleEdit = async () => {
  try {
    const formData = new FormData();
    formData.append('productName', formData.productName);
    formData.append('price', formData.price);
    formData.append('content', formData.content);
    formData.append('count', formData.count);
    formData.append('category', formData.category);

    await axios.patch(`http://localhost:9000/api/v1/products/${productId}`, formData);
    navigate(`api/v1/products`);
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
