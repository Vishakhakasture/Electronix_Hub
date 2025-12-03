import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Footer from "../../layout/Footer/Footer";
import { useCart } from "../../../context/CartContext";
import { Carousel } from "react-bootstrap";
import Loader from "../../constants/Loader";
import "./ProductDetails.css";
import Navbar from "../../layout/Header/Navbar";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import no_products from "../../../assets/no_products.png";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const { addToCart } = useCart();
  const [allProducts, setAllProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://691c087d3aaeed735c8f339c.mockapi.io/api/v1/product")
      .then((res) => setAllProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

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

  if (loading) {
    return (
      <>
        <Navbar />
        <Loader />
        <Footer />
      </>
    );
  }

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  console.log(relatedProducts);

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="no-products-wrapper">
          <img
            src={no_products}
            alt="no_products"
            className="no-products-img"
          />
          <p className="no-products-text">No products found</p>
        </div>
        <Footer />
      </>
    );
  }

  const path = location.pathname;
  const fromSearch = path.includes("search");
  const category = product.category;

  const allImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  return (
    <>
      <Navbar />

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
              activeIndex={activeIndex}
              onSelect={(selectedIndex) => setActiveIndex(selectedIndex)}
              className="details-carousel"
            >
              {allImages.map((img, index) => (
                <Carousel.Item key={index}>
                  <Zoom>
                    <img
                      className="carousel-main-img"
                      src={img}
                      alt={product.title}
                    />
                  </Zoom>
                </Carousel.Item>
              ))}
            </Carousel>

            {allImages.length > 1 && (
              <div className="thumbnail-row">
                {allImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    className={`thumb-img ${
                      activeIndex === index ? "active-thumb" : ""
                    }`}
                    alt="thumb"
                    onClick={() => setActiveIndex(index)}
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
                <button onClick={() => setQuantity((p) => (p > 1 ? p - 1 : 1))}>
                  −
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((p) => p + 1)}>+</button>
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

            {product.reviews && product.reviews.length > 0 && (
              <div className="reviews-section compact-review">
                <h5 className="review-title">Customer Reviews</h5>

                <div className="all-reviews-box">
                  {product.reviews.map((r, i) => (
                    <div className="single-review" key={i}>
                      <div className="review-row">
                        <span className="review-username">{r.user}</span>
                        <span className="review-stars">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <span
                              key={idx}
                              className={
                                idx < (r.rating || 4) ? "star filled" : "star"
                              }
                            >
                              ★
                            </span>
                          ))}
                        </span>
                      </div>

                      <p className="review-comment">{r.comment}</p>

                      {i !== product.reviews.length - 1 && (
                        <hr className="review-line" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        {product && (
          <div className="related-section">
            <h3 className="related-heading">Related Products</h3>

            {relatedProducts.length > 0 ? (
              <div className="related-grid">
                {relatedProducts.map((r) => (
                  <div className="related-card" key={r.id}>
                    <div className="related-img-wrapper">
                      <img src={r.image} alt={r.title} />
                    </div>

                    <div className="related-info">
                      <p className="related-title">{r.title}</p>
                      <p className="related-price">₹{r.price}</p>
                      <button
                        className="related-view-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/product/${r.id}`);
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No similar products found.</p>
            )}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default ProductDetails;
