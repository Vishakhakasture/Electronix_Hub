import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import productData from "./ProductData";
import "./ProductList.css";
import Navbar from "../home-page/Navbar";
import NavbarItems from "../home-page/NavbarItems";

const ProductList = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [sortOption, setSortOption] = useState("Select");

  // Filtering logic
  useEffect(() => {
    let products = category
      ? productData.filter(
          (p) => p.category.toLowerCase() === category.toLowerCase()
        )
      : [...productData];

    if (selectedCategories.length > 0) {
      products = products.filter((p) => selectedCategories.includes(p.category));
    }

    if (selectedBrands.length > 0) {
      products = products.filter((p) => selectedBrands.includes(p.brand));
    }

    if (selectedPrice) {
      if (selectedPrice === "low") {
        products = products.filter((p) => p.price < 1000);
      } else if (selectedPrice === "medium") {
        products = products.filter((p) => p.price >= 1000 && p.price < 2000);
      } else if (selectedPrice === "high") {
        products = products.filter((p) => p.price >= 2000);
      }
    }

    if (sortOption === "low-high") {
      products.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-low") {
      products.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(products);
  }, [category, selectedCategories, selectedBrands, selectedPrice, sortOption]);

  // Handlers
  const handleCategoryChange = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handlePriceChange = (range) => {
    setSelectedPrice(selectedPrice === range ? null : range);
  };

  return (
    <>
      <Navbar />
      <NavbarItems />

      {/* Breadcrumb Section */}
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        {category && (
          <>
            <span> / </span>
            <Link to={`/category/${category.toLowerCase()}`}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Link>
          </>
        )}
        <span> / Products</span>
      </div>

      <div className="product-page-container">
        <div className="product-page-content">
          {/* Sidebar Filters */}
          <aside className="filter-sidebar">
            <h4>Filters</h4>

            <div className="filter-section">
              <h5>Category</h5>
              {["Smartphones", "Laptops", "Watches"].map((cat) => (
                <label key={cat}>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCategoryChange(cat)}
                  />{" "}
                  {cat}
                </label>
              ))}
            </div>

            <div className="filter-section">
              <h5>Price Range</h5>
              <label>
                <input
                  type="checkbox"
                  checked={selectedPrice === "low"}
                  onChange={() => handlePriceChange("low")}
                />{" "}
                ₹0 - ₹999
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={selectedPrice === "medium"}
                  onChange={() => handlePriceChange("medium")}
                />{" "}
                ₹1000 - ₹1999
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={selectedPrice === "high"}
                  onChange={() => handlePriceChange("high")}
                />{" "}
                ₹2000+
              </label>
            </div>

            <div className="filter-section">
              <h5>Brand</h5>
              {["Apple", "Samsung", "Dell", "HP"].map((brand) => (
                <label key={brand}>
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                  />{" "}
                  {brand}
                </label>
              ))}
            </div>
          </aside>

          {/* Product Section */}
          <div className="product-list-section">
            <div className="sort-section">
              <label>Sort By:&nbsp;</label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="Select">Select</option>
                <option value="low-high">Price: Low → High</option>
                <option value="high-low">Price: High → Low</option>
                <option value="popularity">Popularity</option>
              </select>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="product-grid">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="product-card"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <img src={product.image} alt={product.title} />
                    <h3>{product.title}</h3>
                    <p>{product.brand}</p>
                    <p>₹{product.price}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-products">No products found.</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
