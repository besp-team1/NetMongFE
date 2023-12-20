import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AddToCart from '../carts/AddToCart';
import '../../style/products/ProductDetail.css';

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();
  const navigate = useNavigate();

  const [updateData, setUpdateData] = useState({
    productName: product ? product.productName : '',
    price: product ? product.price : '',
    content: product ? product.content : '',
    count: product ? product.count : null,
    category: product ? product.category : null
  });

  const API_BASE_URL = `${process.env.REACT_APP_HOST_URL}/api/v1/products`;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/${productId}`);
        setProduct(response.data.data);
      } catch (error) {
        console.error('상품 정보 불러오기 중 오류 발생:', error.message);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/${productId}`);
      alert('삭제되었습니다.');
      navigate('/api/v1/products'); 
    } catch (error) {
      console.error('상품 삭제 중 오류 발생:', error.message);
    }
  };

  const handleEdit = async () => {
    try {
      await axios.patch(`${API_BASE_URL}/${productId}`, updateData);
    } catch (error) {
      console.error('상품 수정 중 오류 발생:', error.message);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail-container">
      <h2>상품 상세 정보</h2>
      <p>상품 이름: {product.productName}</p>
      <p>가격: {product.price}</p>
      <p>상세 내용: {product.content}</p>
      <p>카테고리: {product.category}</p>

      <img className="productItem-image" src={`https://my-jw-s3-bucket.s3.ap-northeast-2.amazonaws.com/${product.imageUrl}`} alt="상품 이미지"
              width="100"
              height="100" />

      <AddToCart productId={productId} />

      <div className="button-container">
        <Link to={`/api/v1/products/${productId}/edit`}>
          <button>수정하기</button>
        </Link>
        <button onClick={handleDelete}>삭제하기</button>
      </div>
    </div>
  );
}

export default ProductDetail;
