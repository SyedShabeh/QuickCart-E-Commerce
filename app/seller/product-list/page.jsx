'use client';
import React, { useEffect, useState } from 'react';
import { assets } from '../../../assets/assets';
import Image from 'next/image';
import { useAppContext } from '../../../context/AppContext';
import Loading from '../../../components/Loading';
import Footer from '../../../components/seller/Footer';
import { toast } from 'react-toastify';

const ProductList = () => {
  const { router, products, deleteProduct } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false); 


  const showAlertMessage = () => {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000); 
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleDelete = (productId) => {
      deleteProduct(productId);
      showAlertMessage();
      console.log(`Deleted product with ID: ${productId}`); 
      toast.success('Product deleted successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
  };

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full md:p-10 p-4">
          <h2 className="pb-4 text-lg font-medium">All Products</h2>
          <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">

            <div className="hidden lg:block w-full">
              <table className="table-fixed w-full overflow-hidden">
                <thead className="text-gray-900 text-sm text-left">
                  <tr>
                    <th className="w-2/5 px-4 py-3 font-medium truncate">Product</th>
                    <th className="px-4 py-3 font-medium truncate">Category</th>
                    <th className="px-4 py-3 font-medium truncate">Price</th>
                    <th className="px-4 py-3 font-medium truncate">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-500">
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-4 py-3 text-center">
                        No products available.
                      </td>
                    </tr>
                  ) : (
                    products.map((product, index) => (
                      <tr key={product._id || index} className="border-t border-gray-500/20">
                        <td className="px-4 py-3 flex items-center space-x-3">
                          <div className="bg-gray-500/10 rounded p-2">
                            <Image
                              src={product.image && product.image[0] ? product.image[0] : assets.placeholder}
                              alt={product.name || 'Product Image'}
                              className="w-16"
                              width={1280}
                              height={720}
                            />
                          </div>
                          <span className="truncate">{product.name}</span>
                        </td>
                        <td className="py-3">{product.category}</td>
                        <td className="py-3">${product.offerPrice.toFixed(2)}</td>
                        <td className="py-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => router.push(`/product/${product._id}`)}
                              className="flex items-center gap-2 px-2 py-2 bg-blue-600 text-white rounded-md"
                            >
                              <span>Visit</span>
                              <Image
                                className="h-4 w-4"
                                src={assets.redirect_icon}
                                alt="Redirect icon"
                              />
                            </button>
                            
                            <button
                              onClick={() => handleDelete(product._id)}
                              className="flex items-center gap-2 px-2 py-2 bg-red-600 text-white rounded-md"
                            >
                              <span>Delete</span>
                              <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                            {showAlert && (
                            <div className="fixed top-20 right-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg animate-fade-in text-2xl">
                                ☠ Your product is deleted sucessfully
                            </div>
                        )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Tablet and below (md to lg-1): Card Layout */}
            <div className="block lg:hidden w-full">
              {products.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No products available.
                </div>
              ) : (
                products.map((product, index) => (
                  <div
                    key={product._id || index}
                    className="border-b border-gray-500/20 p-4 last:border-b-0"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="bg-gray-500/10 rounded p-2">
                        <Image
                          src={product.image && product.image[0] ? product.image[0] : assets.placeholder}
                          alt={product.name || 'Product Image'}
                          className="w-12"
                          width={1280}
                          height={720}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.category}</p>
                        <p className="text-sm text-gray-500">${product.offerPrice.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 mt-3">
                      <button
                        onClick={() => router.push(`/product/${product._id}`)}
                        className="flex items-center justify-center gap-2 px-1 py-1 bg-blue-600 text-white rounded-md"
                      >
                        <span>Visit</span>
                        <Image
                          className="h-4 w-4"
                          src={assets.redirect_icon}
                          alt="Redirect icon"
                        />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="flex items-center justify-center gap-2 px-1 py-1 bg-red-600 text-white rounded-md"
                      >
                        <span>Delete</span>
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ProductList;