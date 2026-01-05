import "./OutOfStockModal.css";

const OutOfStockModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="confirm-overlay">
      <div className="confirm-box shadow-lg">
        <button className="close-icon" onClick={onClose}>
          ×
        </button>

        <h5 className="text-center mb-3 text-danger">Product is Unavailable</h5>

        <p className="text-center">
          The requested quantity is currently not in stock. Please reduce the
          quantity.
        </p>

        <div className="d-flex justify-content-center mt-4">
          <button className="btn btn-secondary px-4" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default OutOfStockModal;
