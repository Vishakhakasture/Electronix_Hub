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
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <NavbarItems />
      <div className="product-details-container">
        <div className="breadcrumb">
            <Link to="/">Home</Link>
                <span> / </span>
            <Link to={`product/category/${product.category.toLowerCase()}`}>
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </Link>
            <span> / </span>
            <span>{product.title}</span>
        </div>

        <div className="product-details-content">
          <div className="product-gallery">
            <img src={selectedImage} alt={product.title} className="main-image" />
            <div className="thumbnail-row">
              {[product.image, ...(product.gallery || [])].map((img, index) => (
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

          <div className="product-info">
            <h2>{product.title}</h2>
            <p className="brand">{product.brand}</p>
            <h3 className="price">₹{product.price}</h3>

            <p className="description">{product.description}</p>

            <div className="quantity-section">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)}>+</button>
              </div>
            </div>

            <div className="action-buttons">
              <button className="add-to-cart">Add to Cart</button>
              <button className="buy-now">Buy Now</button>
            </div>

            <div className="product-specs">
              <h4>Technical Specifications</h4>
              <ul>
                {product.specs?.map((spec, i) => (
                  <li key={i}>{spec}</li>
                ))}
              </ul>
            </div>

            <div className="reviews">
              <h4>Customer Reviews</h4>
              {product.reviews?.map((rev, i) => (
                <p key={i} className="review">
                  ⭐ {rev.rating}/5 – {rev.comment}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
