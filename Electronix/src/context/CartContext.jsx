import React, { createContext, useState, useContext, useEffect } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from Firestore on mount
  useEffect(() => {
    const fetchCart = async () => {
      if (!auth.currentUser) return;
      const q = query(
        collection(db, "cart"),
        where("userId", "==", auth.currentUser.uid)
      );
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCartItems(items);
    };

    fetchCart();
  }, [auth.currentUser]);

  const addToCart = async (product, qty = 1) => {
  if (!auth.currentUser) {
    alert("Please login to add to cart");
    return;
  }

  const existing = cartItems.find((item) => item.id === product.id);
  if (existing) {
    const docRef = doc(db, "cart", existing.id);
    await updateDoc(docRef, { quantity: existing.quantity + qty });
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + qty }
          : item
      )
    );
  } else {
    const docRef = doc(collection(db, "cart"));
    const newItem = { ...product, quantity: qty, userId: auth.currentUser.uid };
    await setDoc(docRef, newItem);
    setCartItems((prev) => [...prev, { ...newItem, id: docRef.id }]);
  }

  alert("Added to cart!");
};


  const updateQuantity = async (id, qty) => {
    const item = cartItems.find((item) => item.id === id);
    if (!item) return;
    const newQty = Math.max(qty, 1);

    const docRef = doc(db, "cart", id);
    await updateDoc(docRef, { quantity: newQty });

    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const removeFromCart = async (id) => {
    const docRef = doc(db, "cart", id);
    await deleteDoc(docRef);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = async () => {
    // Delete all user's cart items from Firestore
    const q = query(collection(db, "cart"), where("userId", "==", auth.currentUser.uid));
    const snapshot = await getDocs(q);
    snapshot.forEach((docSnap) => deleteDoc(doc(db, "cart", docSnap.id)));

    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
