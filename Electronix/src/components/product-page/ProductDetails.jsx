import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";
import Footer from "../home-page/Footer";
import "./ProductDetails.css";
import { useCart } from "../../context/CartContext";
import Header from "../home-page/Header";

const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get(`https://691c087d3aaeed735c8f339c.mockapi.io/api/v1/product/${id}`)
      .then((res) => {
        setProduct(res.data);
        setSelectedImage(res.data.image || res.data.images?.[0]);
      })
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  if (!product) {
    return <div className="no-products">No products found</div>;
  }

  const path = location.pathname;
  const fromSearch = path.includes("search");
  const category = product.category;

  return (
    <>
      <Header />
      <div className="product-details-container">
        <div className="breadcrumb">
          <Link to="/">Home</Link>

          {category && !fromSearch && (
            <>
              <span> / </span>
              <Link to={`/products/${category.toLowerCase()}`}>{category}</Link>
              <span> / </span>
              <span>Products</span>
            </>
          )}

          {fromSearch && (
            <>
              <span> / </span>
              <Link to="/products">Products</Link>
            </>
          )}

          <span> / </span>
          <span>{product.title}</span>
        </div>

        <div className="product-details-content">
          <div className="product-gallery">
            <img src={selectedImage} alt={product.title} className="main-image" />
            {product.images && product.images.length > 1 && (
              <div className="thumbnail-row">
                {product.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`thumb-${index}`}
                    className={`thumb ${selectedImage === img ? "active" : ""}`}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="product-info">
            <h2>{product.title}</h2>
            <p className="brand">{product.brand}</p>
            <p className="price">₹{product.price}</p>
            <p className="description">{product.description}</p>

            <div className="quantity-section">
              <div className="quantity-controls">
                <button onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}>−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
              </div>
            </div>

            <div className="action-buttons">
              <button
                className="add-to-cart"
                onClick={() => addToCart(product, quantity)}
              >
                Add to Cart
              </button>
            </div>

            {product.specs && (
              <div className="product-specs">
                <h4>Specifications:</h4>
                <ul>
                  {Object.entries(product.specs).map(([key, value], index) => (
                    <li key={index}>
                      <strong>{key}:</strong> {value}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.reviews && (
              <div className="reviews">
                <h4>Customer Reviews:</h4>
                {product.reviews.map((review, index) => (
                  <div key={index} className="review">
                    <strong>{review.user}:</strong> {review.comment}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
