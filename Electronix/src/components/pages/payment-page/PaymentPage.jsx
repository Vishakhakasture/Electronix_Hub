import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  doc,
  updateDoc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
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

  const clearCart = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(collection(db, "cart"), where("userId", "==", user.uid));
    const snapshot = await getDocs(q);

    for (let snap of snapshot.docs) {
      await deleteDoc(snap.ref);
    }
  };

  const handleCOD = async () => {
    try {
      await updateDoc(doc(db, "orders", orderId), {
        paymentMethod: "Cash on Delivery",
        paymentStatus: "SUCCESS",
        status: "PLACED",
      });

      toast.success("Order placed successfully!");
      navigate("/profile");
    } catch (err) {
      console.error(err);
      toast.error("Payment failed");
    }
  };

  const handleRazorpay = () => {
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
            paymentStatus: "Success",
            paymentId: response.razorpay_payment_id,
            status: "Placed",
          });

          toast.success("Payment successful!");
          navigate("/profile");
        } catch (err) {
          console.error(err);
          toast.error("Payment update failed");
        }
      },
      theme: { color: "#121212" },
    };

    const rzp = new window.Razorpay(options);
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
