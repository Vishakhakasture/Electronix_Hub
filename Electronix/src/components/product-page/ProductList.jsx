// src/components/product-page/ProductList.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import productData from "./ProductData";
import "./ProductList.css";
import Navbar from "../home-page/Navbar";
import NavbarItems from "../home-page/NavbarItems";
import { useBreadcrumb } from "../../context/BreadcrumbContext";


const ProductList = () => {
  const { category } = useParams(); // param from /products/:category
  const navigate = useNavigate();

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [sortOption, setSortOption] = useState("Select");

  const { updateBreadcrumb } = useBreadcrumb();

  useEffect(() => {
    updateBreadcrumb(["Products"]);
  }, []);

  const formatLabel = (raw) => {
    if (!raw) return "";
    return raw
      .toString()
      .replace(/-/g, " ")
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  const categoryMapping = {
    smartphones: ["Android Phones", "iPhones", "5G Phones", "Tablets"],
    laptops: ["Gaming Laptops", "Business Laptops", "Student Laptops", "MacBooks"],
    watches: ["Analogue Watch", "Digital Watch", "Smart Watch"],
    headphones: ["Earbuds", "Gaming Headsets", "Wired Headphones"],
    cameras: ["DSLR Cameras", "Action Cameras", "Security Cameras"],
  };

  useEffect(() => {
    let filtered = [...productData];
    const normalizedCategory = category?.toLowerCase();

    if (normalizedCategory) {
      if (categoryMapping[normalizedCategory]) {
        filtered = productData.filter((p) =>
          categoryMapping[normalizedCategory].includes(p.category)
        );
      } else {
      
        filtered = productData.filter((p) => {
          const productCat = (p.category || "").toString().toLowerCase();
          const urlifiedProductCat = productCat.replace(/\s+/g, "-");
          return (
            productCat === normalizedCategory ||
            urlifiedProductCat === normalizedCategory ||
            productCat.replace(/[^a-z0-9]/g, "") === normalizedCategory.replace(/[^a-z0-9]/g, "")
          );
        });
      }
    } else {
      filtered = [...productData];
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category));
    }

    if (selectedBrands.length > 0) {
      filtered = filtered.filter((p) => selectedBrands.includes(p.brand));
    }

    if (selectedPrice) {
      if (selectedPrice === "low") filtered = filtered.filter((p) => p.price < 1000);
      else if (selectedPrice === "medium")
        filtered = filtered.filter((p) => p.price >= 1000 && p.price < 2000);
      else if (selectedPrice === "high") filtered = filtered.filter((p) => p.price >= 2000);
    }

    if (sortOption === "low-high") filtered.sort((a, b) => a.price - b.price);
    else if (sortOption === "high-low") filtered.sort((a, b) => b.price - a.price);

    setFilteredProducts(filtered);
  }, [category, selectedCategories, selectedBrands, selectedPrice, sortOption]);

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

  const categoryLinkPath = category ? `/products/${category}` : "/products";

  return (
    <>
      <Navbar />
      <NavbarItems />

      <div className="breadcrumb">
  <Link to="/">Home</Link>
  {category && (
    <>
      <span> / </span>
      <Link to={`/products/${category}`}>{formatLabel(category)}</Link>
    </>
  )}
  <span> / Products</span>
</div>


      <div className="product-page-container">
        <div className="product-page-content">
          <aside className="filter-sidebar">
            <h4>Filters</h4>

            <div className="filter-section">
              <h5>Category</h5>
              {["Smartphones", "Laptops", "Watches", "Headphones", "Cameras"].map((cat) => (
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

          <div className="product-list-section">
            <div className="sort-section">
              <label>Sort By:&nbsp;</label>
              <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
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
