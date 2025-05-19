'use client';

import { assets } from "../../assets/assets";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Image from "next/image";
import { useState } from "react";
import { useAppContext } from "../../context/AppContext"; // ✅ import context
import { useRouter } from "next/navigation"; // ✅ import router

const AddAddress = () => {
  const router = useRouter();
  const { addAddress } = useAppContext(); // ✅ use addAddress from context

  const [address, setAddress] = useState({
    fullName: '',
    phoneNumber: '',
    pincode: '',
    area: '',
    city: '',
    state: '',
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // ✅ Call context function to save
    addAddress(address);

    // ✅ Redirect to cart
    router.push("/cart");
  };

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32 py-16 flex flex-col md:flex-row justify-between">
        <form onSubmit={onSubmitHandler} className="w-full">
          <p className="text-2xl md:text-3xl text-gray-500">
            Add Shipping <span className="font-semibold text-blue-600">Address</span>
          </p>
          <div className="space-y-3 max-w-sm mt-10">
            <input
              className="px-2 py-2.5 focus:border-blue-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
              type="text"
              placeholder="Full name"
              onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
              value={address.fullName}
              required
            />
            <input
              className="px-2 py-2.5 focus:border-blue-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
              type="text"
              placeholder="Phone number"
              onChange={(e) => setAddress({ ...address, phoneNumber: e.target.value })}
              value={address.phoneNumber}
              required
            />
            <input
              className="px-2 py-2.5 focus:border-blue-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
              type="text"
              placeholder="Pin code"
              onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
              value={address.pincode}
              required
            />
            <textarea
              className="px-2 py-2.5 focus:border-blue-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500 resize-none"
              rows={4}
              placeholder="Address (Area and Street)"
              onChange={(e) => setAddress({ ...address, area: e.target.value })}
              value={address.area}
              required
            ></textarea>
            <div className="flex space-x-3">
              <input
                className="px-2 py-2.5 focus:border-blue-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                type="text"
                placeholder="City/District/Town"
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                value={address.city}
                required
              />
              <input
                className="px-2 py-2.5 focus:border-blue-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                type="text"
                placeholder="State"
                onChange={(e) => setAddress({ ...address, state: e.target.value })}
                value={address.state}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="max-w-sm w-full mt-6 bg-blue-600 text-white py-3 hover:bg-blue-700 uppercase"
          >
            Save address
          </button>
        </form>
        <Image
          className="md:mr-16 mt-16 md:mt-0"
          src={assets.my_location_image}
          alt="my_location_image"
        />
      </div>
      <Footer />
    </>
  );
};

export default AddAddress;
