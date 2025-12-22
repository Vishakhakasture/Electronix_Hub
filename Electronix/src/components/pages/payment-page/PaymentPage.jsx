import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import toast from "react-hot-toast";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { orderId, total } = location.state || {};

  if (!orderId || !total) {
    navigate("/cart");
    return null;
  }

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCOD = async () => {
    try {
      await updateDoc(doc(db, "orders", orderId), {
        paymentMethod: "Cash on Delivery",
        paymentStatus: "Success",
        status: "Placed",
      });

      toast.success("Order placed successfully!");
      navigate("/profile");
    } catch (err) {
      console.error(err);
      toast.error("COD failed");
    }
  };

  const handleRazorpay = async () => {
    const isLoaded = await loadRazorpay();

    if (!isLoaded) {
      toast.error("Razorpay SDK failed to load");
      return;
    }

    const options = {
      key: "rzp_test_RhsXbpdc3eWEeN",
      amount: total * 100,
      currency: "INR",
      name: "ElectroNix",
      description: "Order Payment",

      handler: async function (response) {
        try {
          await updateDoc(doc(db, "orders", orderId), {
            paymentMethod: "Razorpay",
            paymentStatus: "SUCCESS",
            paymentId: response.razorpay_payment_id,
            status: "PLACED",
          });

          toast.success("Payment successful!");
          navigate("/profile");
        } catch (err) {
          console.error(err);
          toast.error("Payment update failed");
        }
      },

      modal: {
        ondismiss: function () {
          toast.error("Payment cancelled");
        },
      },

      prefill: {
        name: auth.currentUser?.displayName || "User",
        email: auth.currentUser?.email || "test@example.com",
        contact: "9999999999",
      },

      theme: { color: "#121212" },
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function (response) {
      toast.error(response.error.description || "Payment failed");
    });

    rzp.open();
  };

  return (
    <div className="container p-5 text-center">
      <h2 className="mb-4 fw-bold">Choose Payment Method</h2>
      <h4 className="mb-4">Total Amount: ₹{total}</h4>

      <button
        className="btn btn-outline-dark px-4 py-2 me-3"
        onClick={handleCOD}
      >
        Cash on Delivery
      </button>

      <button className="btn btn-dark px-4 py-2" onClick={handleRazorpay}>
        Pay with Razorpay
      </button>
    </div>
  );
};

export default PaymentPage;
