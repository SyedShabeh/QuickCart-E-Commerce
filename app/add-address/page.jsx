'use client'
import React, { useState } from "react";
import { assets } from "../../assets/assets";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import { useAppContext } from "../../context/AppContext";

const AddressPage = () => {
  const { 
    savedAddresses, 
    addAddress, 
    selectAddress, 
    selectedAddress,
    addressRedirectSource,
    router
  } = useAppContext();

  const [addressForm, setAddressForm] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    phone: ""
  });

  // Handle address form input changes
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressForm({
      ...addressForm,
      [name]: value
    });
  };

  // Save new address
  const handleSaveAddress = (e) => {
    e.preventDefault();
    addAddress(addressForm);
    // The redirect will be handled in the addAddress function in context
  };

  // Go back to previous page
  const handleGoBack = () => {
    if (addressRedirectSource) {
      router.push(addressRedirectSource);
    } else {
      router.push('/cart');
    }
  };

  // Use an existing address and return to previous page
  const useExistingAddress = (index) => {
    selectAddress(index);
    handleGoBack();
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 md:px-16 lg:px-32 pt-10 mb-20">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <button 
              onClick={handleGoBack}
              className="flex items-center text-blue-600 hover:underline"
            >
              <Image
                src={assets.arrow_right_icon_colored}
                alt="back"
                className="transform rotate-180 mr-2"
              />
              <span>Back to Cart</span>
            </button>
          </div>
          
          <h1 className="text-2xl font-medium text-gray-800 mb-6">Add New Address</h1>
          
          <form onSubmit={handleSaveAddress} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={addressForm.fullName}
                  onChange={handleAddressChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={addressForm.phone}
                  onChange={handleAddressChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                Street Address
              </label>
              <textarea
                id="street"
                name="street"
                placeholder="Enter your street address"
                value={addressForm.street}
                onChange={handleAddressChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
                rows={2}
              />
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="City"
                  value={addressForm.city}
                  onChange={handleAddressChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  placeholder="State"
                  value={addressForm.state}
                  onChange={handleAddressChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                  Zip Code
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  placeholder="Zip Code"
                  value={addressForm.zipCode}
                  onChange={handleAddressChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <button 
                type="button"
                onClick={handleGoBack}
                className="px-6 py-2 mr-4 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Address
              </button>
            </div>
          </form>
          
          {/* Saved Addresses Section */}
          {savedAddresses.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-medium text-gray-800 mb-4">Saved Addresses</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {savedAddresses.map((address, index) => (
                  <div 
                    key={index}
                    className={`p-4 border rounded-md ${
                      selectedAddress === address ? "border-blue-500 bg-blue-50" : "border-gray-200"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{address.fullName}</p>
                        <p className="text-sm text-gray-600">{address.street}</p>
                        <p className="text-sm text-gray-600">{`${address.city}, ${address.state} - ${address.zipCode}`}</p>
                        <p className="text-sm text-gray-600">{address.phone}</p>
                      </div>
                      <button 
                        onClick={() => useExistingAddress(index)}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Use this address
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddressPage;