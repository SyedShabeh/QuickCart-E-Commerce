// AppContext.js
'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { productsDummyData, userDummyData } from "../assets/assets";

export const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = (props) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY;
  const router = useRouter();
  const { user } = useUser();

  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState(false);
  const [isSeller, setIsSeller] = useState(true);
  const [cartItems, setCartItems] = useState({});
  const [savedAddresses, setSavedAddresses] = useState([]);

  // PRODUCTS & USER DATA
  const fetchProductData = async () => {
    setProducts(productsDummyData);
  };

  const fetchUserData = async () => {
    setUserData(userDummyData);
  };

  // CART
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
  };

  const updateCartQuantity = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    if (quantity === 0) {
      delete cartData[itemId];
    } else {
      cartData[itemId] = quantity;
    }
    setCartItems(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      totalCount += cartItems[item];
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      const itemInfo = products.find((product) => product._id === item);
      if (itemInfo) {
        totalAmount += itemInfo.offerPrice * cartItems[item];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  // ADDRESS MANAGEMENT
  const addAddress = (newAddress) => {
    const updated = [newAddress, ...savedAddresses];
    setSavedAddresses(updated);
    localStorage.setItem("savedAddresses", JSON.stringify(updated));
  };

  // LOAD FROM LOCALSTORAGE
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (err) {
        console.error("Failed to parse cartItems from localStorage", err);
      }
    }

    const storedAddresses = localStorage.getItem("savedAddresses");
    if (storedAddresses) {
      try {
        setSavedAddresses(JSON.parse(storedAddresses));
      } catch (err) {
        console.error("Failed to parse savedAddresses from localStorage", err);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    fetchProductData();
    fetchUserData();
  }, []);

  const value = {
    user,
    currency,
    router,
    isSeller,
    setIsSeller,
    userData,
    fetchUserData,
    products,
    fetchProductData,
    cartItems,
    setCartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
    getCartAmount,
    savedAddresses,
    addAddress,
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};