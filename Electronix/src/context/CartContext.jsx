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
import { onAuthStateChanged } from "firebase/auth";
import toast from "react-hot-toast";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 🔥 NEW

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const q = query(
          collection(db, "cart"),
          where("userId", "==", currentUser.uid)
        );
        const snapshot = await getDocs(q);
        const items = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setCartItems(items);
      } else {
        setCartItems([]);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addToCart = async (product, qty = 1) => {
    if (!user) {
      toast.success("Please login to add items to cart");
      return;
    }
    toast.success("Product added to cart");

    const existing = cartItems.find((item) => item.productId === product.id);

    if (existing) {
      const docRef = doc(db, "cart", existing.id);
      await updateDoc(docRef, {
        quantity: existing.quantity + qty,
      });

      setCartItems((prev) =>
        prev.map((item) =>
          item.id === existing.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        )
      );
    } else {
      const docRef = doc(collection(db, "cart"));
      const newItem = {
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: qty,
        userId: user.uid,
      };

      await setDoc(docRef, newItem);

      setCartItems((prev) => [...prev, { ...newItem, id: docRef.id }]);
    }
  };

  const updateQuantity = async (id, qty) => {
    const newQty = Math.max(qty, 1);
    const docRef = doc(db, "cart", id);

    await updateDoc(docRef, { quantity: newQty });

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
    toast.success("Quantity updated successfully");
  };

  const removeFromCart = async (id) => {
    await deleteDoc(doc(db, "cart", id));
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast.success("Product removed from cart successfully");
  };

  const clearCart = async () => {
    if (!user) return;

    const q = query(collection(db, "cart"), where("userId", "==", user.uid));
    const snapshot = await getDocs(q);

    await Promise.all(
      snapshot.docs.map((d) => deleteDoc(doc(db, "cart", d.id)))
    );
    setCartItems([]);
    toast.success("All products from cart are removed");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        loading, // 🔥 exposing loading state
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
