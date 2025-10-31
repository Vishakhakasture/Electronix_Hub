import './App.css';
import Home from './components/home-page/Home.jsx';
import Auth from './components/auth-page/Auth.jsx';
import { Routes, Route } from 'react-router-dom';
import SubCategoryPage from './components/home-page/SubCategoryPage.jsx';
import ProductList from './components/product-page/ProductList.jsx';
import ProductDetails from './components/product-page/ProductDetails.jsx';
import CartPage from './components/cart-page/CartPage.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/electronics/:category/:subCategory"
        element={<SubCategoryPage />}
      />
      <Route path="/products/:category" element={<ProductList />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
}

export default App;
