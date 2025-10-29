// src/components/product-page/ProductList.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import productData from "./ProductData";
import "./ProductList.css";

const ProductList = () => {
  const { category } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [sortOption, setSortOption] = useState("Select");

  useEffect(() => {
    let products = category
      ? productData.filter(
          (p) => p.category.toLowerCase() === category.toLowerCase()
        )
      : [...productData];

    // Category filter
    if (selectedCategories.length > 0) {
      products = products.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      products = products.filter((p) => selectedBrands.includes(p.brand));
    }

    // Price filter
    if (selectedPrice) {
      if (selectedPrice === "low") {
        products = products.filter((p) => p.price < 1000);
      } else if (selectedPrice === "medium") {
        products = products.filter((p) => p.price >= 1000 && p.price < 2000);
      } else if (selectedPrice === "high") {
        products = products.filter((p) => p.price >= 2000);
      }
    }

    // Sorting
    if (sortOption === "low-high") {
      products.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-low") {
      products.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(products);
  }, [category, selectedCategories, selectedBrands, selectedPrice, sortOption]);

  const handleCategoryChange = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat)
        ? prev.filter((c) => c !== cat)
        : [...prev, cat]
    );
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  const handlePriceChange = (range) => {
    setSelectedPrice(selectedPrice === range ? null : range);
  };

  return (
    <div className="product-page-container">
      <div className="category-header">
        <h2>
          {category
            ? category.charAt(0).toUpperCase() + category.slice(1)
            : "Products"}
        </h2>
      </div>

      <div className="product-page-content">
        {/* Sidebar */}
        <aside className="filter-sidebar">
          <h4>Filters</h4>

          {/* Category Filter */}
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

          {/* Price Filter */}
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

          {/* Brand Filter */}
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

        {/* Product List Section */}
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
                <div key={product.id} className="product-card">
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
  );
};

export default ProductList;
