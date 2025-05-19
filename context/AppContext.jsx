'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { productsDummyData, userDummyData, orderDummyData } from "../assets/assets";

export const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = (props) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY || "$";
  const router = useRouter();
  const { user } = useUser();
  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState(false);
  const [isSeller, setIsSeller] = useState(true);
  const [cartItems, setCartItems] = useState({});
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isOrderProcessing, setIsOrderProcessing] = useState(false);


  const fetchProductData = async () => {
    setProducts(productsDummyData);
  };

  const fetchUserData = async () => {
    setUserData(userDummyData);
  };

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

  const addAddress = (newAddress) => {
    const updated = [newAddress, ...savedAddresses];
    setSavedAddresses(updated);
    setSelectedAddress(newAddress); // Auto-select the new address
    localStorage.setItem("savedAddresses", JSON.stringify(updated));
    return updated;
  };

  const selectAddress = (addressId) => {
    const address = savedAddresses.find(addr => addr.id === addressId);
    if (address) {
      setSelectedAddress(address);
      return true;
    }
    return false;
  };


  const placeOrder = async () => {
    if (!selectedAddress) {
      throw new Error("Please select an address");
    }

    setIsOrderProcessing(true);
    
    try {
      const orderItems = Object.keys(cartItems).map(itemId => {
        const product = products.find(p => p._id === itemId);
        return {
          product: product,
          quantity: cartItems[itemId]
        };
      });

      const subtotal = getCartAmount();
      const shippingFee = 5;
      const tax = Math.round(subtotal * 0.05 * 100) / 100;
      const totalAmount = (subtotal + shippingFee + tax).toFixed(2);


      const newOrder = {
        id: `order-${Date.now()}`,
        items: orderItems,
        amount: totalAmount,
        date: new Date().toISOString(),
        address: selectedAddress,
        status: "Pending",
        paymentMethod: "COD"
      };

      await new Promise(resolve => setTimeout(resolve, 2000));

      const updatedOrders = [newOrder, ...userOrders];
      setUserOrders(updatedOrders);
      localStorage.setItem("userOrders", JSON.stringify(updatedOrders));
      
      setCartItems({});
      localStorage.setItem("cartItems", JSON.stringify({}));
      
      return newOrder;
    } finally {
      setIsOrderProcessing(false);
    }
  };

  useEffect(() => {
    const initializeData = async () => {

      const storedCart = localStorage.getItem("cartItems");
      if (storedCart) {
        try {
          setCartItems(JSON.parse(storedCart));
        } catch (err) {
          console.error("Failed to parse cartItems", err);
        }
      }


      const storedAddresses = localStorage.getItem("savedAddresses");
      if (storedAddresses) {
        try {
          const addresses = JSON.parse(storedAddresses);
          setSavedAddresses(addresses);
          if (addresses.length > 0) {
            setSelectedAddress(addresses[0]); 
          }
        } catch (err) {
          console.error("Failed to parse savedAddresses", err);
        }
      }

      const storedOrders = localStorage.getItem("userOrders");
      if (storedOrders) {
        try {
          setUserOrders(JSON.parse(storedOrders));
        } catch (err) {
          console.error("Failed to parse userOrders", err);
          setUserOrders(orderDummyData || []);
          localStorage.setItem("userOrders", JSON.stringify(orderDummyData || []));
        }
      } else {
        setUserOrders(orderDummyData || []);
        localStorage.setItem("userOrders", JSON.stringify(orderDummyData || []));
      }

      fetchProductData();
      fetchUserData();
    };

    initializeData();
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);


  const calculateCartSummary = () => {
    const subtotal = getCartAmount();
    const shipping = subtotal > 0 ? 5 : 0;
    const tax = Math.round(subtotal * 0.05 * 100) / 100;
    const total = subtotal + shipping + tax;
    
    return {
      subtotal,
      shipping,
      tax,
      total
    };
  };

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
    selectAddress,
    selectedAddress,
    placeOrder,
    userOrders,
    calculateCartSummary,
    isOrderProcessing
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};