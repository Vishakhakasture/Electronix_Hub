import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home-page/Home.jsx';
import Auth from './components/auth-page/Auth.jsx';
import ProductList from './components/product-page/ProductList.jsx';
import ProductDetails from './components/product-page/ProductDetails.jsx';
import CartPage from './components/cart-page/CartPage.jsx';
import CheckoutPage from './components/checkout-page/CheckoutPage.jsx';
import ProfilePage from './components/profile-page/ProfilePage.jsx';
import PaymentPage from './components/payment-page/PaymentPage.jsx';
import SuccessPage from './components/payment-page/SuccessPage.jsx';
import Contact from './components/auth-page/Contact.jsx';

function App() {
  return (
    <>
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
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
