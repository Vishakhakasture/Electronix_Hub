import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../layout/Header/Navbar";
import Footer from "../../layout/Footer/Footer";
import { useCart } from "../../../context/CartContext";
import "./BulkProducts.css";
import Loader from "../../constants/Loader";
import { TiDeleteOutline } from "react-icons/ti";

const EMPTY_ROW = {
  productId: "",
  quantity: 1,
  product: null,
  error: "",
};

const BulkProducts = () => {
  const [products, setProducts] = useState([]);
  const [rows, setRows] = useState([EMPTY_ROW]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get("https://691c087d3aaeed735c8f339c.mockapi.io/api/v1/product")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const updateRow = (index, updatedFields) => {
    setRows((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], ...updatedFields };
      return updated;
    });
  };

  const handleQuantityChange = (index, qty) => {
    if (qty <= 0) return;
    updateRow(index, { quantity: qty });
  };

  const removeRow = (index) => {
    if (rows.length === 1) {
      setRows([EMPTY_ROW]);
      return;
    }
    setRows((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const filtered = products.filter((p) =>
      p.title.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filtered.slice(0, 5));
  };

  const handleSuggestionSelect = (product) => {
    setRows((prevRows) => {
      const emptyIndex = prevRows.findIndex((r) => !r.product);

      if (emptyIndex !== -1) {
        const updated = [...prevRows];
        updated[emptyIndex] = {
          productId: product.id,
          product,
          quantity: 1,
          error: "",
        };
        return updated;
      }

      return [
        ...prevRows,
        {
          productId: product.id,
          product,
          quantity: 1,
          error: "",
        },
      ];
    });

    setSearchTerm("");
    setSuggestions([]);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter" && suggestions.length > 0) {
      e.preventDefault();
      handleSuggestionSelect(suggestions[0]);
    }
  };

  const addAllToCart = async () => {
    const validItems = rows.filter((r) => r.product && !r.error);

    if (validItems.length === 0) {
      alert("No valid products to add");
      return;
    }

    try {
      for (const item of validItems) {
        await addToCart(item.product, item.quantity);
      }

      setRows([EMPTY_ROW]);
      setSearchTerm("");
      setSuggestions([]);
    } catch (err) {
      console.error("Bulk add failed", err);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <Loader />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="bulk-container">
        <h2 className="bulk-title">Bulk Order</h2>
        <p className="bulk-subtitle">
          Quickly add multiple products to your cart
        </p>

        <div
          className="bulk-search"
          style={{ position: "relative", zIndex: 20 }}
        >
          <input
            type="text"
            placeholder="Search product to add..."
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
          />

          {suggestions.length > 0 && (
            <ul className="bulk-suggestions">
              {suggestions.map((p) => (
                <li key={p.id} onMouseDown={() => handleSuggestionSelect(p)}>
                  {p.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bulk-table">
          <div className="bulk-header">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Total</span>
            <span></span>
          </div>

          {rows.map((row, index) => (
            <div key={index} className="bulk-row">
              <div className="bulk-product-name">
                {row.product ? row.product.title : "No product selected"}
              </div>

              <span className="bulk-price">
                {row.product ? `₹${row.product.price}` : "-"}
              </span>

              <input
                type="number"
                min="1"
                value={row.quantity}
                disabled={!row.product}
                onChange={(e) =>
                  handleQuantityChange(index, Number(e.target.value))
                }
              />

              <span className="bulk-total">
                {row.product ? `₹${row.product.price * row.quantity}` : "-"}
              </span>

              <button
                className="remove-btn"
                onClick={() => removeRow(index)}
                title="Remove row"
              >
                <TiDeleteOutline />
              </button>
            </div>
          ))}
        </div>

        <div className="bulk-actions">
          <button className="add-cart-btn" onClick={addAllToCart}>
            Add All to Cart
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default BulkProducts;
