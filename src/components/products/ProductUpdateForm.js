import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProductUpdateForm() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    productName: '',
    price: '',
    content: '',
    count: '',
    category: '',
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/api/v1/products/${productId}`);
        setProduct(response.data.data);
      } catch (error) {
        console.error('Error fetching product information:', error.message);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updateData = {
        productName: product.productName,
        price: product.price,
        content: product.content,
        count: parseInt(product.count), // Convert count to integer
        category: product.category,
        // Add other fields as needed
      };

      await axios.patch(`http://localhost:9000/api/v1/products/${productId}`, updateData);

      // Redirect or handle the updated state as needed
      navigate(`/products/${productId}`, { replace: true });
    } catch (error) {
      console.error('Error updating product:', error.message);
    }
  };

  if (!product.productName) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleUpdate}>
        <label>
          Product Name:
          <input
            type="text"
            name="productName"
            value={product.productName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Price:
          <input type="text" name="price" value={product.price} onChange={handleInputChange} />
        </label>
        <label>
          Category:
          <input type="text" name="category" value={product.category} onChange={handleInputChange} />
        </label>
        <label>
          Description:
          <textarea name="content" value={product.content} onChange={handleInputChange} />
        </label>
        <label>
          Quantity:
          <input type="text" name="count" value={product.count} onChange={handleInputChange} />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default ProductUpdateForm;