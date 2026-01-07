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

  // Fetch products
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

  // ✅ CSV Upload Handler
  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => parseCSV(event.target.result);
    reader.readAsText(file);

    e.target.value = ""; // reset input
  };

  // ✅ CSV Parser (productName, quantity)
  const parseCSV = (text) => {
    const lines = text.trim().split("\n");

    if (lines.length <= 1) {
      setRows([EMPTY_ROW]);
      return;
    }

    const dataLines = lines.slice(1);

    const importedRows = dataLines.map((line) => {
      const [productName, qty] = line.split(",");

      if (!productName) {
        return {
          ...EMPTY_ROW,
          error: "Invalid CSV row",
        };
      }

      const matchedProduct = products.find(
        (p) => p.title.toLowerCase().trim() === productName.toLowerCase().trim()
      );

      if (!matchedProduct) {
        return {
          productId: "",
          product: null,
          quantity: Number(qty) || 1,
          error: "Mentioned product is not available",
        };
      }

      return {
        productId: matchedProduct.id,
        product: matchedProduct,
        quantity: Number(qty) || 1,
        error: "",
      };
    });

    setRows(importedRows.length ? importedRows : [EMPTY_ROW]);
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

  // 🔍 Manual search
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

      const newRow = {
        productId: product.id,
        product,
        quantity: 1,
        error: "",
      };

      if (emptyIndex !== -1) {
        const updated = [...prevRows];
        updated[emptyIndex] = newRow;
        return updated;
      }

      return [...prevRows, newRow];
    });

    setSearchTerm("");
    setSuggestions([]);
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
        <h2 className="bulk-title">Quick Order</h2>
        <p className="bulk-subtitle">
          Quickly add multiple products to your cart
        </p>

        {/* ✅ CSV Upload */}
        <div className="bulk-csv-upload">
          <label className="csv-label">
            Import CSV
            <input type="file" accept=".csv" onChange={handleCSVUpload} />
          </label>
          <span className="csv-hint">
            Upload CSV with <b>productName, quantity</b>
          </span>
        </div>

        {/* Search */}
        <div className="bulk-search">
          <input
            type="text"
            placeholder="Search product to add..."
            value={searchTerm}
            onChange={handleSearchChange}
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

        {/* Table */}
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
                {row.error && <p className="bulk-error">{row.error}</p>}
              </div>

              <span>{row.product ? `₹${row.product.price}` : "-"}</span>

              <input
                type="number"
                min="1"
                value={row.quantity}
                disabled={!row.product}
                onChange={(e) =>
                  handleQuantityChange(index, Number(e.target.value))
                }
              />

              <span>
                {row.product ? `₹${row.product.price * row.quantity}` : "-"}
              </span>

              <button className="remove-btn" onClick={() => removeRow(index)}>
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
