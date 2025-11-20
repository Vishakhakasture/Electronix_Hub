import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";
import Footer from "../home-page/Footer";
import "./ProductDetails.css";
import { useCart } from "../../context/CartContext";
import Header from "../home-page/Header";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get(`https://691c087d3aaeed735c8f339c.mockapi.io/api/v1/product/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch(() => {});
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

      <div className="product-page-wrapper">
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

        <div className="product-details-container">
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

          <div className="product-info">
            <h2>{product.title}</h2>
            <p className="brand">{product.brand}</p>
            <p className="price">₹{product.price}</p>
            <p className="description">{product.description}</p>

            <div className="quantity-section">
              <div className="quantity-controls">
                <button onClick={() => setQuantity((p) => (p > 1 ? p - 1 : 1))}>−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((p) => p + 1)}>+</button>
              </div>
            </div>

            <div className="action-buttons">
              <button className="add-to-cart" onClick={() => addToCart(product, quantity)}>
                Add to Cart
              </button>
            </div>

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
