import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./PaymentPage.css";

const SuccessPage = () => {
  const { state } = useLocation();

  return (
    <div className="text-center p-5">
      <h2 className="fw-bold">Payment Successfull</h2>
      <p>Thank you for shopping with <strong>ElectroNix</strong></p>
      {state?.total && (
        <p className="mt-2">You paid: <strong>₹{state.total.toLocaleString()}</strong></p>
      )}

      <Link to="/" className="btn btn-dark mt-4 px-4 py-2">Go to Home</Link>
    </div>
  );
};

export default SuccessPage;
