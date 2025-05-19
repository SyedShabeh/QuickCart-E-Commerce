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
  const [addressRedirectSource, setAddressRedirectSource] = useState(''); // Track where to return after adding address

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
    setSelectedAddress(newAddress); // Automatically select the new address
    localStorage.setItem("savedAddresses", JSON.stringify(updated));
    localStorage.setItem("selectedAddressIndex", "0"); // Save the index of the selected address
    
    // Navigate back to the source page (if specified)
    if (addressRedirectSource) {
      router.push(addressRedirectSource);
      setAddressRedirectSource('');
    } else {
      router.push('/cart'); // Default redirect to cart
    }
  };

  const selectAddress = (addressIndex) => {
    if (addressIndex !== null && addressIndex >= 0 && addressIndex < savedAddresses.length) {
      setSelectedAddress(savedAddresses[addressIndex]);
      localStorage.setItem("selectedAddressIndex", addressIndex.toString());
    } else {
      setSelectedAddress(null);
      localStorage.removeItem("selectedAddressIndex");
    }
  };

  // Navigate to the address page and remember where to return
  const goToAddAddress = (returnPath = '/cart') => {
    setAddressRedirectSource(returnPath);
    router.push('/address');
  };

  // ORDER MANAGEMENT
  const placeOrder = () => {
    if (!selectedAddress) {
      return false; // Cannot place order without address
    }

    // Create order items array
    const orderItems = Object.keys(cartItems).map(itemId => {
      const product = products.find(p => p._id === itemId);
      return {
        product: product,
        quantity: cartItems[itemId]
      };
    });

    // Calculate additional costs
    const subtotal = getCartAmount();
    const shippingFee = 5; // Fixed shipping fee
    const tax = Math.round(subtotal * 0.05 * 100) / 100; // 5% tax, rounded to 2 decimal places
    const totalAmount = (subtotal + shippingFee + tax).toFixed(2);

    // Create new order object
    const newOrder = {
      id: `order-${Date.now()}`,
      items: orderItems,
      amount: totalAmount,
      date: new Date().toISOString(),
      address: selectedAddress,
      status: "Pending",
      paymentMethod: "COD"
    };

    // Add to orders
    const updatedOrders = [newOrder, ...userOrders];
    setUserOrders(updatedOrders);
    localStorage.setItem("userOrders", JSON.stringify(updatedOrders));
    
    // Clear cart
    setCartItems({});
    localStorage.setItem("cartItems", JSON.stringify({}));
    
    // Navigate to orders page
    router.push('/my-orders');
    return true;
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
        const addresses = JSON.parse(storedAddresses);
        setSavedAddresses(addresses);
        
        // Load selected address if available
        const storedSelectedAddressIndex = localStorage.getItem("selectedAddressIndex");
        if (storedSelectedAddressIndex !== null) {
          const index = parseInt(storedSelectedAddressIndex);
          if (index >= 0 && index < addresses.length) {
            setSelectedAddress(addresses[index]);
          }
        }
      } catch (err) {
        console.error("Failed to parse savedAddresses from localStorage", err);
      }
    }

    const storedOrders = localStorage.getItem("userOrders");
    if (storedOrders) {
      try {
        setUserOrders(JSON.parse(storedOrders));
      } catch (err) {
        console.error("Failed to parse userOrders from localStorage", err);
        // Initialize with dummy data if parsing fails
        setUserOrders(orderDummyData || []);
        localStorage.setItem("userOrders", JSON.stringify(orderDummyData || []));
      }
    } else {
      // Initialize with dummy data if no orders exist
      setUserOrders(orderDummyData || []);
      localStorage.setItem("userOrders", JSON.stringify(orderDummyData || []));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    fetchProductData();
    fetchUserData();
  }, []);

  // Calculate shipping, tax, and totals for cart
  const calculateCartSummary = () => {
    const subtotal = getCartAmount();
    const shipping = subtotal > 0 ? 5 : 0; // $5 shipping, free if cart is empty
    const tax = Math.round(subtotal * 0.05 * 100) / 100; // 5% tax
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
    goToAddAddress,
    addressRedirectSource,
    setAddressRedirectSource,
    placeOrder,
    userOrders,
    calculateCartSummary
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};