// src/components/product-page/ProductDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import productData from "./ProductData";
import Navbar from "../home-page/Navbar";
import NavbarItems from "../home-page/NavbarItems";
import "./ProductDetails.css";
import { useCart } from "../../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  useEffect(() => {
    const found = productData.find((p) => p.id === parseInt(id));
    setProduct(found);
    setSelectedImage(found?.image);
  }, [id]);

  if (!product) {
    return <div className="no-products">No products found</div>;
  }

  return (
    <>
      <Navbar />
      <NavbarItems />

      <div className="product-details-container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span> / </span>
          <Link to={`/products/${product.category.toLowerCase()}`}>
            {product.category}
          </Link>
          <span> / </span>
          <span>{product.title}</span>
        </div>

        {/* Product content same */}
        <div className="product-details-content">
          {/* ... keep rest of your product details code unchanged ... */}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
