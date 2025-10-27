import React from "react";
import "./categories.css";

const categories = [
  { name: "Birthday", image: "/assets/birthday.png" },
  { name: "Occasions", image: "/assets/occasions.png" },
  { name: "Anniversary", image: "/assets/anniversary.png" },
  { name: "Flowers", image: "/assets/flowers.png" },
  { name: "Cakes", image: "/assets/cakes.png" },
  { name: "Personalised", image: "/assets/personalised.png" },
  { name: "Plants", image: "/assets/plants.png" },
  { name: "Chocolates", image: "/assets/chocolates.png" },
  { name: "Combos", image: "/assets/combos.png" },
  { name: "On Trend", image: "/assets/ontrend.png" },
];

const Categories = () => {
  return (
    <div className="categories-container">
      {categories.map((category, index) => (
        <div key={index} className="category-item">
          <div className="category-image-wrapper">
            <img
              src={category.image}
              alt={category.name}
              className="category-image"
            />
          </div>
          <p className="category-title">{category.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Categories;
