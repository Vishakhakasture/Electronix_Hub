import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Footer from "../home-page/Footer.jsx";
import "./ProductList.css";
import { useBreadcrumb } from "../../context/BreadcrumbContext";
import Header from "../home-page/Header";
import Loader from "./Loader";

const ProductList = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [batchSize] = useState(20);
  const [hasMore, setHasMore] = useState(true);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [sortOption, setSortOption] = useState("Select");

  const [loading, setLoading] = useState(true); // <-- LOADING STATE

  const { updateBreadcrumb } = useBreadcrumb();

  useEffect(() => {
    updateBreadcrumb(["Products"]);
  }, []);

  useEffect(() => {
    setLoading(true); 
    axios
      .get("https://691c087d3aaeed735c8f339c.mockapi.io/api/v1/product")
      .then((res) => {
        setAllProducts(res.data);
      })
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false)); // Stop loading
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

  // ------------ FILTERING LOGIC ------------
  useEffect(() => {
    if (allProducts.length === 0) return;

    let filtered = [...allProducts];
    const normalizedCategory = category?.toLowerCase();

    if (normalizedCategory) {
      if (categoryMapping[normalizedCategory]) {
        filtered = allProducts.filter((p) =>
          categoryMapping[normalizedCategory].includes(p.category)
        );
      } else {
        filtered = allProducts.filter((p) => {
          const productCat = (p.category || "").toString().toLowerCase();
          const urlifiedProductCat = productCat.replace(/\s+/g, "-");
          return (
            productCat === normalizedCategory ||
            urlifiedProductCat === normalizedCategory ||
            productCat.replace(/[^a-z0-9]/g, "") ===
              normalizedCategory.replace(/[^a-z0-9]/g, "")
          );
        });
      }
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
    setDisplayProducts(filtered.slice(0, batchSize));
    setHasMore(filtered.length > batchSize);
  }, [
    category,
    selectedCategories,
    selectedBrands,
    selectedPrice,
    sortOption,
    batchSize,
    allProducts,
  ]);

  // ------------ INFINITE SCROLL ------------
  const loadMore = useCallback(() => {
    if (!hasMore) return;
    setDisplayProducts((prev) => {
      const currentLength = prev.length;
      const additionalItems = filteredProducts.slice(currentLength, currentLength + batchSize);
      if (additionalItems.length === 0) {
        setHasMore(false);
        return prev;
      }
      return [...prev, ...additionalItems];
    });
  }, [filteredProducts, hasMore, batchSize]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight + 100 >= fullHeight) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMore]);

  // ------------ HANDLERS ------------
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

  // ------------ SHOW LOADER BEFORE DATA FETCH ------------
  if (loading) {
    return (
      <>
        <Header />
        <Loader />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

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

      <div className="page-wrapper">
        <div className="product-page-content">
          <aside className="filter-sidebar">
            <h4>Filters</h4>

            <div className="filter-section">
              <h5>Price Range</h5>
              {["low", "medium", "high"].map((range) => (
                <label key={range}>
                  <input
                    type="checkbox"
                    checked={selectedPrice === range}
                    onChange={() => handlePriceChange(range)}
                  />
                  {range === "low" && " ₹0 - ₹999"}
                  {range === "medium" && " ₹1000 - ₹1999"}
                  {range === "high" && " ₹2000+"}
                </label>
              ))}
            </div>

            <div className="filter-section">
              <h5>Brand</h5>
              {["Apple", "Samsung", "Dell", "HP", "Sony"].map((brand) => (
                <label key={brand}>
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                  />
                  {brand}
                </label>
              ))}
            </div>
          </aside>

          <div className="product-list-section">
            <div className="sort-section">
              <label>Sort By:&nbsp;</label>
              <select
                className="select"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="Select">Select</option>
                <option value="low-high">Price: Low → High</option>
                <option value="high-low">Price: High → Low</option>
              </select>
            </div>

            {displayProducts.length > 0 ? (
              <div className="product-grid">
                {displayProducts.map((product) => (
                  <div
                    key={product.id}
                    className="product-card"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <div className="image-wrapper">
                      <img src={product.image} alt={product.title} />
                    </div>
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

      <Footer />
    </>
  );
};

export default ProductList;
