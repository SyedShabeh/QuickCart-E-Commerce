'use client'
import React, { useState } from "react";
import { assets } from "../assets/assets";
import Image from "next/image";
import { useAppContext } from "../context/AppContext";

const OrderSummary = () => {
  const { 
    cartItems, 
    products, 
    getCartAmount,
    calculateCartSummary,
    placeOrder,
    savedAddresses,
    addAddress,
    selectAddress,
    selectedAddress,
    currency,
    router
  } = useAppContext();

  const [showAddressSelection, setShowAddressSelection] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    phone: ""
  });
  const { subtotal, shipping, tax, total } = calculateCartSummary();

  // Handle address form input changes
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressForm({
      ...addressForm,
      [name]: value
    });
  };

  // Save new address
  const handleAddNewAddress = (e) => {
    e.preventDefault();
    addAddress(addressForm);
    selectAddress(0); // Select the newly added address (it will be at index 0)
    setAddressForm({
      fullName: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      phone: ""
    });
    setShowAddressForm(false);
    setShowAddressSelection(false);
  };

  // Handle place order button click
  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      setShowAddressSelection(true);
      return;
    }
    
    // If address is selected, place the order
    const success = placeOrder();
    if (success) {
      // Order placed successfully
    } else {
      // Show address selection if failed
      setShowAddressSelection(true);
    }
  };

  // Check if cart is empty
  const isCartEmpty = Object.keys(cartItems).length === 0;

  return (
    <div className="md:w-96 w-full bg-gray-100 p-6 rounded-lg h-fit">
      <p className="text-xl text-gray-700 font-medium mb-6">Order Summary</p>
      
      {/* Address Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <p className="text-gray-600 font-medium">Shipping Address</p>
          <button 
            onClick={() => {
              setShowAddressSelection(!showAddressSelection);
              setShowAddressForm(false);
            }}
            className="text-xs text-blue-600"
          >
            {selectedAddress ? "Change" : "Select"}
          </button>
        </div>
        
        {selectedAddress ? (
          <div className="text-sm text-gray-500">
            <p>{selectedAddress.fullName}</p>
            <p>{selectedAddress.street}</p>
            <p>{`${selectedAddress.city}, ${selectedAddress.state} - ${selectedAddress.zipCode}`}</p>
            <p>{selectedAddress.phone}</p>
          </div>
        ) : (
          <p className="text-sm text-gray-500">No shipping address selected.</p>
        )}

        {/* Address Selection */}
        {showAddressSelection && !showAddressForm && (
          <div className="mt-4 border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium">Select an address:</p>
              <button 
                onClick={() => {
                  setShowAddressForm(true);
                  setShowAddressSelection(false);
                }}
                className="text-xs text-blue-600"
              >
                Add New
              </button>
            </div>
            {savedAddresses.length > 0 ? (
              <div className="max-h-60 overflow-y-auto">
                {savedAddresses.map((address, index) => (
                  <div 
                    key={index}
                    onClick={() => {
                      selectAddress(index);
                      setShowAddressSelection(false);
                    }}
                    className={`p-3 mb-2 border rounded-md text-sm cursor-pointer ${
                      selectedAddress === address ? "border-blue-500 bg-blue-50" : "border-gray-200"
                    }`}
                  >
                    <p className="font-medium">{address.fullName}</p>
                    <p>{address.street}</p>
                    <p>{`${address.city}, ${address.state} - ${address.zipCode}`}</p>
                    <p>{address.phone}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-gray-500 mb-2">No addresses saved</p>
                <button 
                  onClick={() => setShowAddressForm(true)}
                  className="text-sm text-blue-600 font-medium"
                >
                  Add a new address
                </button>
              </div>
            )}
          </div>
        )}

        {/* Add New Address Form */}
        {showAddressForm && (
          <div className="mt-4 border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm font-medium">Add New Address</p>
              <button 
                onClick={() => {
                  setShowAddressForm(false);
                  setShowAddressSelection(true);
                }}
                className="text-xs text-blue-600"
              >
                Back to Selection
              </button>
            </div>
            <form onSubmit={handleAddNewAddress} className="space-y-3 text-sm">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={addressForm.fullName}
                onChange={handleAddressChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={addressForm.phone}
                onChange={handleAddressChange}
                className="w-full p-2 border rounded"
                required
              />
              <textarea
                name="street"
                placeholder="Street Address"
                value={addressForm.street}
                onChange={handleAddressChange}
                className="w-full p-2 border rounded"
                required
                rows={2}
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={addressForm.city}
                  onChange={handleAddressChange}
                  className="w-1/2 p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={addressForm.state}
                  onChange={handleAddressChange}
                  className="w-1/2 p-2 border rounded"
                  required
                />
              </div>
              <input
                type="text"
                name="zipCode"
                placeholder="Zip Code"
                value={addressForm.zipCode}
                onChange={handleAddressChange}
                className="w-full p-2 border rounded"
                required
              />
              <button 
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
              >
                Save Address
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Pricing Section */}
      <div className="border-t border-gray-300 pt-4 space-y-3">
        <div className="flex justify-between items-center">
          <p className="text-gray-600">Subtotal</p>
          <p className="font-medium">{currency}{subtotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-600">Shipping Fee</p>
          <p className="font-medium">{currency}{shipping.toFixed(2)}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-600">Tax (5%)</p>
          <p className="font-medium">{currency}{tax.toFixed(2)}</p>
        </div>
        <div className="flex justify-between items-center border-t border-gray-300 pt-3">
          <p className="text-gray-800 font-medium">Total</p>
          <p className="font-bold text-lg">{currency}{total.toFixed(2)}</p>
        </div>
      </div>

      {/* Payment Method */}
      <div className="mt-4 border-t border-gray-300 pt-4">
        <p className="text-gray-600 font-medium mb-2">Payment Method</p>
        <div className="flex items-center gap-2 p-2 border border-gray-300 rounded-md bg-white">
          <input 
            type="radio" 
            id="cod" 
            name="paymentMethod" 
            defaultChecked 
            className="accent-blue-600"
          />
          <label htmlFor="cod" className="text-sm flex-1">Cash on Delivery</label>
        </div>
      </div>

      <button
        onClick={handlePlaceOrder}
        disabled={isCartEmpty}
        className={`w-full py-3 mt-6 rounded-md text-white flex justify-center items-center gap-3 ${
          isCartEmpty
            ? "bg-blue-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        <span>Place Order</span>
        <Image src={assets.arrow_icon_white} alt="arrow_right_icon" />
      </button>
    </div>
  );
};

export default OrderSummary;
