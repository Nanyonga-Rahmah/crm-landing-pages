'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

const LandingPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className=" py-2 overflow-x-hidden mx-auto">
      <header className="bg-white ">
        <div className="flex justify-between items-center py-4 px-6">
          <div className="text-2xl font-bold">
            <span className="text-teal-600">Nova</span>
            <span>CRM</span>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 focus:outline-none"
            >
              {isOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
          <nav className="hidden md:flex space-x-4 font-semibold">
            <a href="#features">Features</a>
            <a href="#faq">FAQ</a>
            <a href="#pricing">Pricing</a>
          </nav>
          <div className="hidden md:flex space-x-4">
            <a href="/login">
              <Button variant="outline">Login</Button>
            </a>
            <a href="/signup">
              <Button>SignUp</Button>
            </a>
          </div>
        </div>
        <div
          className={`fixed inset-0 bg-white transform ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out z-50 md:hidden`}
        >
          <div className="flex justify-end p-4">
            <button
              onClick={toggleMenu}
              className="text-gray-600 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col pl-4 space-y-4 font-semibold">
            <a href="#features" onClick={toggleMenu}>
              Features
            </a>
            <a href="#faq" onClick={toggleMenu}>
              FAQ
            </a>
            <a href="#pricing" onClick={toggleMenu}>
              Pricing
            </a>
          </nav>
          <div className="flex flex-col items-center space-y-4 mt-4">
            <a href="/login" onClick={toggleMenu}>
              <Button variant="outline" className="w-full">
                Login
              </Button>
            </a>
            <a href="/signup" onClick={toggleMenu}>
              <Button className="w-full">SignUp</Button>
            </a>
          </div>
        </div>
      </header>

      <main className="py-12  px-6">
        <section className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            Increase your productivity
            <br />
            <span className="text-teal-600">
              Customer relationship simplified
            </span>
          </h1>
          <p className="mb-8">
            With seamless integrations, power analytics, and advanced marketing
            tools, you can take your business to the next level and create
            sustainable growth with NovaCRM
          </p>

          <Link href="/signup">
            <Button>Get Started</Button>
          </Link>
        </section>
        <section className="mt-12">
          <div className="flex justify-center">
            <Image
              src="/dashboard.png"
              alt="Dashboard"
              width={1200}
              height={800}
            />
          </div>
        </section>
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-4">
            The struggle of streamlining customer interactions
          </h2>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2">
              <Image
                src="/sally.png"
                alt="Customer Interactions"
                width={400}
                height={400}
              />
            </div>
            <div className="md:w-1/2 text-center md:text-left p-4">
              <p>
                In today’s digital age, customers expect seamless and
                personalized experiences. However, businesses often struggle to
                manage customer interactions across multiple channels, resulting
                in disjointed, inefficient, and frustrating interactions. This
                can lead to dissatisfied customers and a poor brand reputation.
              </p>
            </div>
          </div>
        </section>
        <section id="features" className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">
            NovaCRM makes customer interactions easy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-white shadow rounded">
              <h3 className="font-bold mb-2">Contact Management</h3>
              <p>
                Store and organize all of your customer and prospect information
                in one place.
              </p>
            </div>
            <div className="p-4 bg-white shadow rounded">
              <h3 className="font-bold mb-2">Lead Management</h3>
              <p>
                Track and manage leads from initial contact to closing the deal.
              </p>
            </div>
            <div className="p-4 bg-white shadow rounded">
              <h3 className="font-bold mb-2">Customer Support</h3>
              <p>
                Track customer interactions, resolve issues and provide
                exceptional support.
              </p>
            </div>
            <div className="p-4 bg-white shadow rounded">
              <h3 className="font-bold mb-2">Reporting</h3>
              <p>Get valuable insights and performance metrics.</p>
            </div>
          </div>
        </section>
        <section id="faq" className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-4">
            Got questions? Answers.
          </h2>
          <div className="space-y-4">
            <details className="bg-white p-4 shadow rounded">
              <summary className="font-bold cursor-pointer">
                How do I import contacts into the CRM system?
              </summary>
              <p className="mt-2">
                You can import contacts using a CSV file or directly from your
                email account.
              </p>
            </details>
            <details className="bg-white p-4 shadow rounded">
              <summary className="font-bold cursor-pointer">
                How can I generate the reports in the CRM tool?
              </summary>
              <p className="mt-2">
                Reports can be generated using the built-in analytics tool
                available in the dashboard.
              </p>
            </details>
            <details className="bg-white p-4 shadow rounded">
              <summary className="font-bold cursor-pointer">
                Can I integrate third-party applications with this CRM tool?
              </summary>
              <p className="mt-2">
                Yes, our CRM tool supports integration with various third-party
                applications through APIs.
              </p>
            </details>
            <details className="bg-white p-4 shadow rounded">
              <summary className="font-bold cursor-pointer">
                What security measures are in place to protect customer data in
                the tool?
              </summary>
              <p className="mt-2">
                We use industry-standard encryption and security protocols to
                ensure your data is protected.
              </p>
            </details>
            <details className="bg-white p-4 shadow rounded">
              <summary className="font-bold cursor-pointer">
                How do I track customer interactions and communications within
                the CRM?
              </summary>
              <p className="mt-2">
                Ensure that all communication channels like emails are logged in
                the system. Categorize different types of interactions for easy
                tracking.
              </p>
            </details>
          </div>
        </section>
      </main>
      <footer className="bg-white-100 text-gray-400 py-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p>&copy; 2024 NovaCRM. All rights reserved.</p>
          </div>

          <div className="flex space-x-4">
            <a href="https://facebook.com">
              <Image
                src="/facebook.svg"
                alt="Facebook"
                width={24}
                height={24}
              />
            </a>
            <a href="https://twitter.com">
              <Image src="/twitter.svg" alt="Twitter" width={24} height={24} />
            </a>
            <a href="https://instagram.com">
              <Image
                src="/instagram.svg"
                alt="Instagram"
                width={24}
                height={24}
              />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
