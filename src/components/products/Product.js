import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../style/products/Product.css';

function Product() {
    const [formData, setFormData] = useState({
        productName: '',
        price: '',
        content: '',
        count: '',
        category: '',
        images:null 
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
        try {
          const formDataForUpload = new FormData();

// FormData에 필드 추가
formDataForUpload.append('productName', formData.productName);
formDataForUpload.append('price', formData.price);
formDataForUpload.append('content', formData.content);
formDataForUpload.append('count', formData.count);
formDataForUpload.append('category', formData.category);

// 이미지 파일이 있다면 추가
if (formData.images) {
  formDataForUpload.append('images', formData.images);
}

    // 서버로 폼 데이터 전송
    try {
      await axios.post(`http://localhost:9000/api/v1/products`, formDataForUpload);
    
      // 페이지 이동
      navigate('/api/v1/products', { replace: true });
    }catch (error) {
      console.error('상품 등록 중 오류 발생:', error.message);
    }
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