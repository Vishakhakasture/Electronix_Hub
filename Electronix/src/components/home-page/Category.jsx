import React from "react";
import { useNavigate } from "react-router-dom";
import "./Category.css";
import smartphoneImg from "../../assets/smartphone.jpeg";
import laptopImg from "../../assets/laptop.jpeg";
import watchImg from "../../assets/watch.jpeg";
import headphoneImg from "../../assets/headphone.jpeg";
import cameraImg from "../../assets/camera.jpeg";

const categories = [
  { name: "Smartphones", image: smartphoneImg, path: "/products/smartphones" },
  { name: "Laptops", image: laptopImg, path: "/products/laptops" },
  { name: "Watches", image: watchImg, path: "/products/watches" },
  { name: "Headphones", image: headphoneImg, path: "/products/headphones" },
  { name: "Cameras", image: cameraImg, path: "/products/cameras" },
];

const Category = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (path) => {
    navigate(path);
  };

  return (
    <div className="category-container">
      <h2 className="category-title">Shop by Category</h2>
      <div className="category-grid">
        {categories.map((category, index) => (
          <div
            key={index}
            className="category-item"
            onClick={() => handleCategoryClick(category.path)}
          >
            <div className="category-img-wrapper">
              <img
                src={category.image}
                alt={category.name}
                className="category-img"
              />
            </div>
            <p className="category-name">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
