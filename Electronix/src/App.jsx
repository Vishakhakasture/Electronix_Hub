import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "../src/components/pages/home-page/Home.jsx";
import Auth from "../src/components/auth/Auth.jsx";
import ProductList from "../src/components/pages/product-page/ProductList.jsx";
import ProductDetails from "../src/components/pages/product-page/ProductDetails.jsx";
import CartPage from "../src/components/pages/cart-page/CartPage.jsx";
import CheckoutPage from "../src/components/pages/checkout-page/CheckoutPage.jsx";
import ProfilePage from "../src/components/pages/profile-page/ProfilePage.jsx";
import PaymentPage from "../src/components/pages/payment-page/PaymentPage.jsx";
import SuccessPage from "../src/components/pages/payment-page/SuccessPage.jsx";
import OrdersPage from "./components/pages/profile-page/OrdersPage.jsx";
import Contact from "../src/components/auth/Contact.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomToaster from "./utils/CustomToaster.jsx";

function App() {
  return (
    <>
      <CustomToaster />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/order-success" element={<SuccessPage />} />
        <Route path="/orders" element={<OrdersPage />} />

        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
