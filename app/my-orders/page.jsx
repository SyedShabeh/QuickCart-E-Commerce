'use client';
import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import Image from "next/image";
import { useAppContext } from "../../context/AppContext";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Loading from "../../components/Loading";

const MyOrders = () => {
    const { currency, userOrders, router } = useAppContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading for better UX
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Navbar />
            <div className="flex flex-col justify-between px-6 md:px-16 lg:px-32 py-6 min-h-screen">
                <div className="space-y-5">
                    <h2 className="text-lg font-medium mt-6">My Orders</h2>
                    {loading ? <Loading /> : (
                        userOrders.length === 0 ? (
                            <div className="text-center py-10">
                                <Image
                                    className="mx-auto mb-4"
                                    src={assets.box_icon}
                                    alt="Empty orders"
                                    width={64}
                                    height={64}
                                />
                                <h3 className="text-xl font-medium mb-2">No orders yet</h3>
                                <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
                                <button 
                                    onClick={() => router.push('/all-products')}
                                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                                >
                                    Start Shopping
                                </button>
                            </div>
                        ) : (
                            <div className="max-w-5xl border-t border-gray-300 text-sm">
                                {userOrders.map((order, index) => (
                                    <div key={order.id || index} className="flex flex-col md:flex-row gap-5 justify-between p-5 border-b border-gray-300">
                                        <div className="flex-1 flex gap-5 max-w-80">
                                            <Image
                                                className="max-w-16 max-h-16 object-cover"
                                                src={assets.box_icon}
                                                alt="box_icon"
                                            />
                                            <p className="flex flex-col gap-3">
                                                <span className="font-medium text-base">
                                                    {order.items.map((item) => 
                                                        item.product?.name 
                                                            ? `${item.product.name} x ${item.quantity}` 
                                                            : `Product x ${item.quantity}`
                                                    ).join(", ")}
                                                </span>
                                                <span>Items: {order.items.length}</span>
                                            </p>
                                        </div>
                                        <div>
                                            <p>
                                                <span className="font-medium">{order.address?.fullName}</span>
                                                <br />
                                                <span>{order.address?.street || order.address?.area}</span>
                                                <br />
                                                <span>{`${order.address?.city || ''}, ${order.address?.state || ''}`}</span>
                                                <br />
                                                <span>{order.address?.phone || order.address?.phoneNumber}</span>
                                            </p>
                                        </div>
                                        <p className="font-medium my-auto">{currency}{order.amount}</p>
                                        <div>
                                            <p className="flex flex-col">
                                                <span>Method: {order.paymentMethod || 'COD'}</span>
                                                <span>Date: {new Date(order.date).toLocaleDateString()}</span>
                                                <span>Payment: {order.status || 'Pending'}</span>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MyOrders;