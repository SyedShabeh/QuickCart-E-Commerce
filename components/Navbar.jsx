"use client"
import React from "react";
import { BagIcon, BoxIcon, CartIcon, HomeIcon, assets} from "../assets/assets";
import Link from "next/link"
import { useAppContext } from "../context/AppContext";
import Image from "next/image";
import { UserButton, useClerk } from "@clerk/nextjs";

const Navbar = () => {

  const { isSeller, router, user } = useAppContext();
  const {openSignIn} = useClerk()

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-5 border-b border-gray-300 text-gray-700 sticky top-0 z-50 backdrop-blur-lg">
      <h1 className="font-bold text-3xl text-blue-600">SHABEH</h1>
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-blue-500 transition">
          Home
        </Link>
        <Link href="/all-products" className="hover:text-blue-500 transition">
          Shop
        </Link>
        <Link href="/" className="hover:text-blue-500 transition">
          About Us
        </Link>
        <Link href="/" className="hover:text-blue-500 transition">
          Contact
        </Link>

        {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full hover:text-white hover:border-white hover:bg-blue-500">Seller Dashboard</button>}

      </div>

      <ul className="hidden md:flex items-center gap-4 ">
        <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />
        {user ? <><UserButton>
            <UserButton.MenuItems>
              <UserButton.Action label="cart"  labelIcon={<CartIcon/>} onClick={()=> router.push("/cart")}/>
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action label="my-order"  labelIcon={<BagIcon/>} onClick={()=> router.push("/my-orders")}/>
            </UserButton.MenuItems>
          </UserButton></> : <button onClick={openSignIn} className="flex items-center gap-2 hover:text-gray-900 transition">
          <Image src={assets.user_icon} alt="user icon" />
          Account
        </button>}
      </ul>

      <div className="flex items-center md:hidden gap-3">
        {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">Seller Dashboard</button>}
        {user ? <><UserButton>
          <UserButton.MenuItems>
              <UserButton.Action label="home"  labelIcon={<HomeIcon/>} onClick={()=> router.push("/")}/>
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action label="products"  labelIcon={<BoxIcon/>} onClick={()=> router.push("/all-products")}/>
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action label="cart"  labelIcon={<CartIcon/>} onClick={()=> router.push("/cart")}/>
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action label="my-order"  labelIcon={<BagIcon/>} onClick={()=> router.push("/my-orders")}/>
            </UserButton.MenuItems>
          </UserButton></> : <button onClick={openSignIn} className="flex items-center gap-2 hover:text-gray-900 transition">
          <Image src={assets.user_icon} alt="user icon" />
          Account
        </button>}
      </div>
    </nav>
  );
};

export default Navbar;