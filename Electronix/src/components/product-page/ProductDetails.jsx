// src/components/product-page/ProductDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import productData from "./ProductData";
import Navbar from "../home-page/Navbar";
import NavbarItems from "../home-page/NavbarItems";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const found = productData.find((p) => p.id === parseInt(id));
    setProduct(found);
    setSelectedImage(found?.image);
  }, [id]);

  if (!product) {
    return <div className="no-products">No products found</div>;
  }

  return (
    <>
      <Navbar />
      <NavbarItems />
      <div className="product-details-container">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span> / </span>
          <Link to={`/products/${product.category.toLowerCase()}`}>
            {product.category}
          </Link>
          <span> / </span>
          <span>{product.title}</span>
        </div>

        <div className="product-details-content">
          <div className="product-gallery">
            <img
              src={selectedImage}
              alt={product.title}
              className="main-image"
            />
            <div className="thumbnail-row">
              {[product.image, ...(product.images || [])].map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`thumb-${index}`}
                  className={selectedImage === img ? "thumb active" : "thumb"}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            <h2>{product.title}</h2>
            <p className="brand">{product.brand}</p>
            <h3 className="price">₹{product.price}</h3>

            <p className="description">{product.description}</p>

            <div className="quantity-section">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                  −
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)}>+</button>
              </div>
            </div>

            <div className="action-buttons">
              <button className="add-to-cart">Add to Cart</button>
              <button className="buy-now">Buy Now</button>
            </div>

            {/* Specs */}
            <div className="product-specs">
              <h4>Technical Specifications</h4>
              <ul>
                {product.specs &&
                  Object.entries(product.specs).map(([key, value], i) => (
                    <li key={i}>
                      <strong>{key}:</strong> {value}
                    </li>
                  ))}
              </ul>
            </div>

            {/* Reviews */}
            <div className="reviews">
              <h4>Customer Reviews</h4>
              {product.reviews?.length > 0 ? (
                product.reviews.map((rev, i) => (
                  <p key={i} className="review">
                    <strong>{rev.user}:</strong> {rev.comment}
                  </p>
                ))
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
