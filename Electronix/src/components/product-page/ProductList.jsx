// src/components/product-page/ProductList.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import productData from "./ProductData";
import "./ProductList.css";
import Navbar from "../home-page/Navbar";
import NavbarItems from "../home-page/NavbarItems";

const ProductList = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [sortOption, setSortOption] = useState("Select");

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
    smartphones: ["Android Phones", "iPhones", "5G Phones", "Foldable Phones", "Tablets"],
    laptops: ["Gaming Laptops", "Business Laptops", "Student Laptops", "MacBooks"],
    watches: ["Analogue Watch", "Digital Watch", "Smart Watch", "Fitness Watch"],
    headphones: ["Earbuds", "Wireless Headphones", "Gaming Headsets", "Wired Headphones"],
    cameras: ["DSLR Cameras", "Mirrorless Cameras", "Action Cameras", "Security Cameras"],
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
          const productCat = (p.category || "").toLowerCase();
          const urlifiedCat = productCat.replace(/\s+/g, "-");
          return (
            productCat === normalizedCategory ||
            urlifiedCat === normalizedCategory
          );
        });
      }
    }

    if (selectedCategories.length > 0)
      filtered = filtered.filter((p) => selectedCategories.includes(p.category));
    if (selectedBrands.length > 0)
      filtered = filtered.filter((p) => selectedBrands.includes(p.brand));

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

  return (
    <>
      <Navbar />
      <NavbarItems />

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        {category && (
          <>
            <span> / </span>
            <span>{formatLabel(category)}</span>
          </>
        )}
        <span> / Products</span>
      </div>

      {/* Rest of product list UI same */}
      <div className="product-page-container">
        {/* ... keep your filter and product list code unchanged ... */}
      </div>
    </>
  );
};

export default ProductList;
