import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
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
import OutOfStockModal from "../../modals/OutOfStockModal";

const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showOutOfStock, setShowOutOfStock] = useState(false);

  useEffect(() => {
    axios
      .get("https://691c087d3aaeed735c8f339c.mockapi.io/api/v1/product")
      .then((res) => setAllProducts(res.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    setLoading(true);
    setQuantity(1);

    axios
      .get(`https://691c087d3aaeed735c8f339c.mockapi.io/api/v1/product/${id}`)
      .then((res) => setProduct(res.data))
      .catch(console.error)
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

  const isAvailable = product.status === "available";
  const stock = product.stock || 0;
  const hasReplacement =
    product.replacementId !== null &&
    product.replacementId !== undefined &&
    product.replacementId !== "" &&
    product.replacementId !== "null";
  const isQuantityValid = quantity <= stock;

  const path = location.pathname;
  const fromSearch = path.includes("search");
  const category = product.category;

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

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
          {/* IMAGES */}
          <div className="product-gallery">
            <Carousel
              interval={null}
              controls
              indicators={false}
              activeIndex={activeIndex}
              onSelect={(i) => setActiveIndex(i)}
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

            {isAvailable ? (
              <p className="text-success">In Stock</p>
            ) : (
              <p className="text-danger">Currently unavailable</p>
            )}

            {isAvailable && (
              <div className="quantity-section">
                <div className="quantity-controls">
                  <button
                    disabled={quantity === 1}
                    onClick={() => setQuantity((q) => q - 1)}
                  >
                    −
                  </button>

                  <span>{quantity}</span>

                  <button
                    onClick={() => {
                      if (quantity + 1 > product.stock) {
                        setShowOutOfStock(true);
                      } else {
                        setQuantity((q) => q + 1);
                      }
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <div className="action-buttons">
              {isAvailable && isQuantityValid && (
                <button
                  className="add-to-cart"
                  onClick={() => addToCart(product, quantity)}
                >
                  Add to Cart
                </button>
              )}

              {isAvailable && !isQuantityValid && (
                <p className="text-warning">
                  Only {stock} items available. Reduce quantity.
                </p>
              )}

              {!isAvailable && hasReplacement ? (
                <div className="replacement-box">
                  <p className="text-danger">
                    This product is no longer available.
                  </p>
                  <button
                    className="btn btn-link"
                    onClick={() =>
                      navigate(`/product/${product.replacementId}`)
                    }
                  >
                    View Replacement Product
                  </button>
                </div>
              ) : (
                !isAvailable && (
                  <p className="text-danger">
                    Sorry, no replacement is available.
                  </p>
                )
              )}
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
                              className={idx < 4 ? "star filled" : "star"}
                            >
                              ★
                            </span>
                          ))}
                        </span>
                      </div>
                      <p className="review-comment">{r.comment}</p>
                      {i !== product.reviews.length - 1 && <hr />}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

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
                      onClick={() => navigate(`/product/${r.id}`)}
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
      </div>
      <OutOfStockModal
        show={showOutOfStock}
        onClose={() => setShowOutOfStock(false)}
      />

      <Footer />
    </>
  );
};

export default ProductDetails;
