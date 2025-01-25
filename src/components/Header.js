import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Header({ searchQuery, setSearchQuery }) {
  const [userEmail, setUserEmail] = useState("");
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const navigate = useNavigate();

  const handleSearch = () => {
    setSearchQuery(localQuery);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchQuery(localQuery); // Set the search query
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("users");
    setUserEmail("");
    toast.success("Logout Successfully");
    navigate("/login");
  };

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      const parsedUser = JSON.parse(storedUsers);
      setUserEmail(parsedUser[0].email);
    }
  }, []);

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  return (
    <div className="bg-gray-100 shadow-md">
      <div className="w-full max-w-screen-xl mx-auto text-sm font-sans">
        <header className="flex flex-col md:flex-row items-center justify-between p-4 md:space-y-0 space-y-4">
          {/* Input Field */}
          <div className="w-full flex justify-center lg:justify-start">
            <div className="relative w-80 lg:w-80 md:w-52">
              <input
                type="text"
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search..."
                className="w-full px-3 py-2 text-gray-800 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={handleSearch}
              >
                <FaSearch />
              </span>
            </div>
          </div>

          {/* Brand Name */}
          <div className="w-full flex justify-center items-center">
            <div className="font-medium text-4xl font-serif text-center">
              the news <br />
              <span className="text-red-700">DeepDev.</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="w-full flex flex-col lg:flex-row items-center justify-center space-x-2 gap-2">
            {userEmail ? (
              <>
                <span className="text-gray-800 font-medium">{userEmail}</span>
                <button
                  type="button"
                  className="px-6 py-2 bg-gray-200 rounded-md font-medium hover:bg-gray-300 shadow-md"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                type="button"
                className="px-6 py-2 bg-gray-200 rounded-md font-medium hover:bg-gray-300 shadow-md"
              >
                Login
              </button>
            )}
            <button className="px-6 py-2 bg-red-700 text-white font-medium rounded-md hover:bg-red-800 shadow-lg">
              Subscribe
            </button>
          </div>
        </header>
      </div>
    </div>
  );
}

export default Header;
