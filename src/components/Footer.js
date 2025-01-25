import React, { useState } from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Categories } from "./data";

function Footer() {
  const [activeTab, setActiveTab] = useState(null);

  return (
    <>
      <div className="bg-yellow-100">
        <div className="w-full max-w-screen-xl mx-auto text-sm font-sans">
          <div className="flex flex-col items-center py-6">
            {/* Brand Name */}
            <div className="text-center">
              <div className="font-medium text-4xl font-serif">
                the news <br />
                <span className="text-red-700">DeepDev.</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex justify-center space-x-6 pt-6 pb-3">
              <a
                href="#"
                className="text-black hover:text-blue-600 transition-colors border border-black hover:border-blue-600 p-2 rounded-full"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="#"
                className="text-black hover:text-blue-600 transition-colors border border-black hover:border-blue-600 p-2 rounded-full"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-black hover:text-blue-600 transition-colors border border-black hover:border-blue-600 p-2 rounded-full"
              >
                <FaInstagram size={20} />
              </a>
            </div>

            {/* <!-- Manu --> */}
            <div className="flex flex-wrap justify-center pt-4 pb-4 space-x-2">
              {Categories?.map((item, index) => (
                <button
                  className={`px-4 py-2 text-sm font-semibold text-gray-700 hover:border-b-2 hover:border-b-blue-600 rounded ${
                    activeTab === item.value
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-700 hover:border-b-2 hover:border-blue-600"
                  }`}
                  type="button"
                  key={index}
                  value={item.value}
                  onClick={() => setActiveTab(item.value)}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-center text-sm text-gray-800 my-2 font-sans font-semibold">
              &copy; {new Date().getFullYear()} DeepDevCoders. All Rights
              Reserved.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
