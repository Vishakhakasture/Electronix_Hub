import React from "react";
import { useParams } from "react-router-dom";

const SubCategoryPage = () => {
  const { category, subCategory } = useParams();

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>{category.toUpperCase()}</h1>
      <h2>{subCategory.replace(/-/g, " ")}</h2>
      <p>Products will be displayed here...</p>
    </div>
  );
};

export default SubCategoryPage;
