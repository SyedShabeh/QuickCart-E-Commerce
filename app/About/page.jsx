"use client"
import { useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import missionImg from '../../assets/mission.jpg'
import storyImg from '../../assets/story.jpg'
import teamone from '../../assets/member2.png'
import teamtwo from '../../assets/member1.jpg'
import teamthree from '../../assets/member3.jpg'
import teamfour from '../../assets/member4.jpg'



export default function About() {
  const [activeTab, setActiveTab] = useState('mission');

  return (
    <>
      <Head>
        <title>About Us | shabeh-E-Commerce</title>
        <meta name="description" content="Learn about our company, mission, and values" />
      </Head>

      <Navbar />

      <main className="bg-white">
        {/* Hero Section */}
        <section className="relative bg-gray-100 py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Story</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Building the future of shopping with passion and innovation
            </p>
          </div>
        </section>

        {/* About Content */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center mb-12 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('mission')}
                className={`px-6 py-3 font-medium ${activeTab === 'mission' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Our Mission
              </button>
              <button
                onClick={() => setActiveTab('story')}
                className={`px-6 py-3 font-medium ${activeTab === 'story' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Our Story
              </button>
              <button
                onClick={() => setActiveTab('values')}
                className={`px-6 py-3 font-medium ${activeTab === 'values' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Our Values
              </button>
              <button
                onClick={() => setActiveTab('team')}
                className={`px-6 py-3 font-medium ${activeTab === 'team' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Our Team
              </button>
            </div>

            {/* Tab Content */}
            <div className="max-w-5xl mx-auto">
              {activeTab === 'mission' && (
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                    <p className="text-gray-600 mb-4">
                      We're on a mission to revolutionize online shopping by providing exceptional quality products,
                      seamless customer experiences, and innovative solutions that make life easier.
                    </p>
                    <p className="text-gray-600">
                      Since our founding in 2020, we've helped over 1 million customers find exactly what they need
                      at prices they can afford, delivered with care and attention to detail.
                    </p>
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={missionImg}
                      alt="Our Mission"
                      width={600}
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'story' && (
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="order-2 md:order-1">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                    <p className="text-gray-600 mb-4">
                      What started as a small idea between friends in a garage has grown into one of the most trusted
                      e-commerce platforms in the industry.
                    </p>
                    <p className="text-gray-600">
                      We began with just 10 products and a passion for quality. Today, we offer thousands of carefully
                      curated items, but we've never lost sight of our original commitment to excellence.
                    </p>
                  </div>
                  <div className="order-1 md:order-2 rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={storyImg}
                      alt="Our Story"
                      width={600}
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'values' && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Core Values</h2>
                  <div className="grid md:grid-cols-3 gap-8">
                    {[
                      {
                        title: "Customer First",
                        icon: "👋",
                        description: "We put our customers at the heart of everything we do, ensuring their needs are always met."
                      },
                      {
                        title: "Quality Matters",
                        icon: "✨",
                        description: "From product selection to packaging, we never compromise on quality."
                      },
                      {
                        title: "Innovation",
                        icon: "💡",
                        description: "We continuously seek better ways to serve our customers and improve our platform."
                      },
                      {
                        title: "Sustainability",
                        icon: "🌱",
                        description: "We're committed to eco-friendly practices and responsible sourcing."
                      },
                      {
                        title: "Transparency",
                        icon: "🔍",
                        description: "Honest pricing, clear policies, and open communication define our approach."
                      },
                      {
                        title: "Community",
                        icon: "🤝",
                        description: "We believe in building relationships, not just processing transactions."
                      }
                    ].map((value, index) => (
                      <div key={index} className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
                        <div className="text-4xl mb-4">{value.icon}</div>
                        <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                        <p className="text-gray-600">{value.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

{activeTab === 'team' && (
  <div>
    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Meet Our Team</h2>
    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
      {/* Team Member 1 */}
      <div className="text-center">
        <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-200">
          <Image
            src={teamone}
            alt="Alex Johnson, Founder & CEO"
            width={128}
            height={128}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-semibold">Alex Johnson</h3>
        <p className="text-blue-600">Founder & CEO</p>
      </div>

      {/* Team Member 2 */}
      <div className="text-center">
        <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-200">
          <Image
            src= {teamtwo}
            alt="Sarah Williams, Head of Product"
            width={128}
            height={128}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-semibold">Sarah Williams</h3>
        <p className="text-blue-600">Head of Product</p>
      </div>

      {/* Team Member 3 */}
      <div className="text-center">
        <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-200">
          <Image
            src={teamthree}
            alt="Michael Chen, Tech Lead"
            width={128}
            height={128}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-semibold">Michael Chen</h3>
        <p className="text-blue-600">Tech Lead</p>
      </div>

      {/* Team Member 4 */}
      <div className="text-center">
        <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-200">
          <Image
            src={teamfour}
            alt="Emma Davis, Customer Experience"
            width={128}
            height={128}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-semibold">Emma Davis</h3>
        <p className="text-blue-600">Customer Experience</p>
      </div>
    </div>
  </div>
)}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="p-6">
                <div className="text-4xl font-bold mb-2">1M+</div>
                <div className="text-blue-100">Happy Customers</div>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold mb-2">10K+</div>
                <div className="text-blue-100">Products Available</div>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-blue-100">Customer Support</div>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold mb-2">100+</div>
                <div className="text-blue-100">Team Members</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Shop With Us?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Join millions of satisfied customers who trust us for quality products and exceptional service.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition">
              <Link href ="/all-products">Start Shopping</Link>
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}