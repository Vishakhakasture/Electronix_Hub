import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";
import Footer from "../home-page/Footer";
import "./ProductDetails.css";
import { useCart } from "../../context/CartContext";
import Header from "../home-page/Header";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Loader from "./Loader"; 

const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true); 

  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://691c087d3aaeed735c8f339c.mockapi.io/api/v1/product/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  // ------------ SHOW LOADER WHILE FETCHING ------------
  if (loading) {
    return (
      <>
        <Header />
        <Loader />
        <Footer />
      </>
    );
  }

  // If API returns nothing after loading
  if (!product) {
    return (
      <>
        <Header />
        <div className="no-products">No products found</div>
        <Footer />
      </>
    );
  }

  const path = location.pathname;
  const fromSearch = path.includes("search");
  const category = product.category;

  return (
    <>
      <Header />

      <div className="product-page-wrapper">
        {/* Breadcrumb Section */}
        <div className="breadcrumb">
          <Link to="/">Home</Link>

          {category && !fromSearch && (
            <>
              <span>/</span>
              <Link to={`/products/${category.toLowerCase()}`}>{category}</Link>
              <span>/</span>
              <span>Products</span>
            </>
          )}

          {fromSearch && (
            <>
              <span>/</span>
              <Link to="/products">Products</Link>
            </>
          )}

          <span>/</span>
          <span>{product.title}</span>
        </div>

        {/* Main Product Details Content */}
        <div className="product-details-container">
          {/* LEFT: Image Gallery */}
          <div className="product-gallery">
            <Carousel
              interval={null}
              controls={true}
              indicators={false}
              className="details-carousel"
            >
              {(product.images && product.images.length > 0
                ? product.images
                : [product.image]
              ).map((img, index) => (
                <Carousel.Item key={index}>
                  <img className="carousel-main-img" src={img} alt={product.title} />
                </Carousel.Item>
              ))}
            </Carousel>

            {product.images && product.images.length > 1 && (
              <div className="thumbnail-row">
                {product.images.map((img, index) => (
                  <img key={index} src={img} className="thumb-img" alt="thumb" />
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product Information */}
          <div className="product-info">
            <h2>{product.title}</h2>
            <p className="brand">{product.brand}</p>
            <p className="price">₹{product.price}</p>
            <p className="description">{product.description}</p>

            {/* Quantity Selector */}
            <div className="quantity-section">
              <div className="quantity-controls">
                <button onClick={() => setQuantity((p) => (p > 1 ? p - 1 : 1))}>−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((p) => p + 1)}>+</button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="action-buttons">
              <button className="add-to-cart" onClick={() => addToCart(product, quantity)}>
                Add to Cart
              </button>
            </div>

            {/* Specifications */}
            {product.specs && (
              <div className="spec-section">
                <h3>Specifications</h3>
                <table className="spec-table">
                  <tbody>
                    {Object.entries(product.specs).map(([k, v], i) => (
                      <tr key={i}>
                        <td>{k}</td>
                        <td>{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Customer Reviews */}
            {product.reviews && (
              <div className="reviews-section">
                <h3>Customer Reviews</h3>
                {product.reviews.map((r, i) => (
                  <div className="review-box" key={i}>
                    <strong>{r.user}</strong>: {r.comment}
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
