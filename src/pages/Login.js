import React, { useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
  const [showPasssword, setShowPassword] = useState(false);
  const [signUp, setSignup] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (signUp) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = users.some((user) => user.email === email);

      if (userExists) {
        toast.warning("User Already Exixts");
        return;
      }

      const newUser = {
        uid: uuidv4(),
        email,
        password,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      toast.success("Account created successfully");
      setEmail("");
      setPassword("");
      setSignup(false);
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      const token = uuidv4();
      localStorage.setItem("token", token);
      toast.success("Login successful!");
      setEmail("");
      setPassword("");
      navigate("/");
    } else {
      toast.error("Invalid credentials!");
    }
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4 text-sm">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg px-6 py-8">
          <h2 className="text-3xl font-medium font-serif text-center mb-6">
            {signUp ? "Sign Up" : "Login"} Form
          </h2>

          {/* Social Icons */}
          <div className="flex justify-center space-x-6 mb-2">
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

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type={showPasssword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                placeholder="Enter your password"
                required
              />
              <div
                className="absolute right-3 top-11 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPasssword)}
              >
                {showPasssword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-700 text-white py-2 px-8 border border-blue-600 rounded-md hover:bg-gray-100 hover:text-black focus:outline-none focus:ring-0 font-semibold"
              >
                {signUp ? "Sign Up" : "Login"}
              </button>
            </div>
          </form>

          <div className="text-center my-4">
            <p className="text-sm font-semibold">
              {signUp ? "Already" : "Don't"} have Account? Go to
              <a
                onClick={() => setSignup(!signUp)}
                className="font-semibold text-blue-700 underline cursor-pointer mx-1"
              >
                {signUp ? "Login" : "Sign Up"}
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
