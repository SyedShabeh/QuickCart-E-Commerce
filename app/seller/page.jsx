'use client';
import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import Image from 'next/image';
import Footer from '../../components/seller/Footer';
import { useAppContext } from '../../context/AppContext';
import { v4 as uuidv4 } from 'uuid';

const AddProduct = () => {
  const { addProduct } = useAppContext();
  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Earphone');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [showAlert, setShowAlert] = useState(false); 


  const showAlertMessage = () => {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000); 
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!name || !description || !price || !offerPrice || files.length === 0) {
      alert('Please fill all fields and upload at least one image.');
      return;
    }

    if (parseFloat(offerPrice) > parseFloat(price)) {
      alert('Offer price cannot be greater than the original price.');
      return;
    }

    // Create image URLs from files
    const imageUrls = files
      .filter((file) => file)
      .map((file) => URL.createObjectURL(file));

    // Create new product object
    const newProduct = {
      _id: uuidv4(),
      name,
      description,
      category,
      price: parseFloat(price),
      offerPrice: parseFloat(offerPrice),
      image: imageUrls, // Array of image URLs
    };

    // Add product to context
    addProduct(newProduct);
    showAlertMessage();

    // Reset form
    setFiles([]);
    setName('');
    setDescription('');
    setCategory('Earphone');
    setPrice('');
    setOfferPrice('');
  };

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {[...Array(4)].map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input
                  onChange={(e) => {
                    const updatedFiles = [...files];
                    updatedFiles[index] = e.target.files[0];
                    setFiles(updatedFiles);
                  }}
                  type="file"
                  id={`image${index}`}
                  accept="image/*"
                  hidden
                />
                <Image
                  className="max-w-24 cursor-pointer"
                  src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area}
                  alt="Upload placeholder"
                  width={100}
                  height={100}
                />
              </label>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-name">
            Product Name
          </label>
          <input
            id="product-name"
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-description">
            Product Description
          </label>
          <textarea
            id="product-description"
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          ></textarea>
        </div>
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="Earphone">Earphone</option>
              <option value="Headphone">Headphone</option>
              <option value="Watch">Watch</option>
              <option value="Smartphone">Smartphone</option>
              <option value="Laptop">Laptop</option>
              <option value="Camera">Camera</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="product-price">
              Product Price
            </label>
            <input
              id="product-price"
              type="number"
              placeholder="0"
              min="0"
              step="0.01"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="offer-price">
              Offer Price
            </label>
            <input
              id="offer-price"
              type="number"
              placeholder="0"
              min="0"
              step="0.01"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setOfferPrice(e.target.value)}
              value={offerPrice}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="px-8 py-2.5 bg-blue-600 text-white font-medium rounded"
        >
          ADD
        </button>
        {showAlert && (
                            <div className="fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg animate-fade-in text-2xl">
                                ✔ Your product is added sucessfully
                            </div>
                        )}
      </form>
      <Footer />
    </div>
  );
};

export default AddProduct;