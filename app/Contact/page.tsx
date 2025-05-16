'use client';

import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function ContactPage() {
    const [showError, setShowError] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const showErrorMessage = () => {
        setShowError(true);
        setTimeout(() => setShowError(false), 3000); // Auto-hide
    };

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: ""
    });

    const showAlertMessage = () => {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const { firstName, lastName, email, message } = formData;

        if (firstName && lastName && email && message) {
            showAlertMessage();

            // Optional: submit to backend here
            console.log(formData);

            // Clear form
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                message: ""
            });
        } else {
            showErrorMessage(); // show red error alert
        }
    };


    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white text-gray-800 px-6 pt-28">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">

                    {/* Left Section */}
                    <div>
                        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
                        <p className="mb-6">
                            Feel free to use the form or drop us an email. Old-fashioned phone calls work too.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center text-blue-600 space-x-3">
                                <FaPhoneAlt className="text-xl" />
                                <span className="text-gray-800">+92 319-0028307</span>
                            </div>
                            <div className="flex items-center text-blue-600 space-x-3">
                                <FaEnvelope className="text-xl" />
                                <span className="text-gray-800">shabehhassan025@gmail.com</span>
                            </div>
                            <div className="flex items-start text-blue-600 space-x-3">
                                <FaMapMarkerAlt className="text-xl mt-1" />
                                <div className="text-gray-800">
                                    <p>Jinnah-Garden</p>
                                    <p>Islamabad</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section (Form) */}
                    <form
                        className="bg-white rounded-lg shadow-md p-6 space-y-6 w-full"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <label className="block mb-1 text-sm font-medium">First</label>
                                <input
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    type="text"
                                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder='First name'
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="block mb-1 text-sm font-medium">Last</label>
                                <input
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    type="text"
                                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder='Last name'
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium">Email</label>
                            <input
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                type="email"
                                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder='Enter email'
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium">Phone (optional)</label>
                            <input
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                type="tel"
                                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="(+xxx)-xxx-xxxxxxx"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={4}
                                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Type your message ..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600 transition"
                        >
                            Submit
                        </button>

                        {showAlert && (
                            <div className="fixed top-20 right-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg animate-fade-in text-2xl">
                                ✔ Your message is send sucessfully!
                            </div>
                        )}

                        {showError && (
                            <div className="fixed top-20 right-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg animate-fade-in text-2xl">
                                ✖ Please fill out all required fields!
                            </div>
                        )}
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}
