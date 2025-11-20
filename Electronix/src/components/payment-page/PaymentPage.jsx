import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const total = location.state?.total || 0;

  const handleCOD = () => {
    navigate("/order-success", {
      state: { total, method: "COD" },
    });
  };

  const handleRazorpay = () => {
    const options = {
      key: "rzp_test_RhsXbpdc3eWEeN",
      amount: total * 100, // ₹ → paise
      currency: "INR",
      name: "ElectroNix",
      description: "Order Payment",
      image: "https://dummyimage.com/100x100/000/fff&text=E",

      handler: function (response) {
        navigate("/order-success", {
          state: {
            total,
            method: "Razorpay",
            paymentId: response.razorpay_payment_id,
          },
        });
      },

      prefill: {
        name: "ElectroNix User",
        email: "test@example.com",
        contact: "9999999999",
      },

      theme: { color: "#121212" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="container p-5 text-center">
      <h2 className="mb-4 fw-bold">Choose Payment Method</h2>

      {/* ✅ Real total displayed */}
      <h4 className="mb-4">Total Amount: ₹{total}</h4>

      <button
        className="btn btn-outline-dark px-4 py-2 me-3"
        onClick={handleCOD}
      >
        Cash on Delivery
      </button>

      <button
        className="btn btn-dark px-4 py-2"
        onClick={handleRazorpay}
      >
        Pay with Razorpay
      </button>
    </div>
  );
};

export default PaymentPage;
