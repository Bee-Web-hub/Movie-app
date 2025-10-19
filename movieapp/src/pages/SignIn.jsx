import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isGuest, setIsGuest] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem("user", email);
      setIsGuest(false);
      navigate("/home");
    } else {
      alert("Please fill in both fields!");
    }
  };

  const handleBrowseAsGuest = () => {
    localStorage.setItem("user", "Guest");
    setIsGuest(true);
    navigate("/home");
  };

  const handleSignOutGuest = () => {
    localStorage.removeItem("user");
    setIsGuest(false);
    navigate("/signin");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6 text-yellow-400">🎬 MovieHub</h1>

      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-80">
        {!isGuest ? (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Sign In or Log In
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 rounded bg-gray-700 text-white focus:outline-none"
              />

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 rounded bg-gray-700 text-white focus:outline-none"
              />

              <button
                type="submit"
                className="bg-yellow-500 text-black font-bold py-2 rounded hover:bg-yellow-400 transition"
              >
                Continue
              </button>
            </form>

            <div className="text-center mt-4">
              <button
                onClick={handleBrowseAsGuest}
                className="bg-transparent border border-yellow-400 text-yellow-400 py-2 px-4 rounded hover:bg-yellow-500 hover:text-black transition"
              >
                Browse as Guest
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">
              Welcome, Guest 👋
            </h2>
            <p className="mb-4 text-gray-300">
              You're currently browsing as a guest.  
              Want to sign in for a full experience?
            </p>
            <button
              onClick={handleSignOutGuest}
              className="bg-yellow-500 text-black font-bold py-2 px-4 rounded hover:bg-yellow-400 transition"
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
