import "./ConfirmModal.css";

const ConfirmModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="confirm-overlay">
      <div className="confirm-box shadow-lg">
        <h5 className="text-center mb-3">Remove Product</h5>
        <p className="text-center">
          Are you sure you want to remove this product from your cart?
        </p>

        <div className="d-flex justify-content-center gap-3 mt-4">
          <button className="btn btn-danger px-4" onClick={onConfirm}>
            Yes
          </button>
          <button className="btn btn-secondary px-4" onClick={onClose}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
