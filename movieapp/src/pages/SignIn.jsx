// src/pages/SignIn.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, Loader2, AlertCircle } from "lucide-react";
import HelpCenter from "./HelpCenter";

export default function SignIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [openHelp, setOpenHelp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email || !form.password) {
      return setError("Please fill in all fields.");
    }
    if (!emailRegex.test(form.email)) {
      return setError("Please enter a valid email address.");
    }
    if (form.password.length < 6) {
      return setError("Password must be at least 6 characters long.");
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);

    navigate("/home");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1525186402429-b4ff38bedbec?auto=format&fit=crop&w=1800&q=60')] bg-cover bg-center opacity-20 animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

      {/* Decorative blurred circles */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-red-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Navbar */}
      <header className="relative flex justify-between items-center px-8 py-6 animate-[fadeIn_0.6s_ease-out]">
        <Link
          to="/"
          className="flex items-center gap-3 group transition-transform hover:scale-105"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-700 rounded-lg shadow-lg shadow-red-600/50 group-hover:shadow-red-600/70 transition-shadow" />
          <span className="font-bold text-2xl tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Moviehub
          </span>
        </Link>
        <button
          onClick={() => setOpenHelp(true)}
          className="text-gray-400 text-sm hover:text-white transition-colors duration-200 hover:underline underline-offset-4"
        >
          Need Help?
        </button>
      </header>

      {/* Center form */}
      <main className="relative flex justify-center items-center px-4 pt-8 pb-16 animate-[fadeInUp_0.8s_ease-out]">
        <form
          onSubmit={handleSubmit}
          className="bg-black/60 backdrop-blur-xl p-10 rounded-2xl w-full max-w-md border border-white/10 shadow-2xl transition-all duration-300 hover:border-white/20"
        >
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-gray-400 text-sm mb-8">
            Sign in to continue to Moviehub
          </p>

          <div className="space-y-5">
            {/* Email Input */}
            <div className="relative group">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors group-focus-within:text-red-500" />
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="w-full bg-white/5 text-white pl-12 pr-4 py-3.5 rounded-xl border border-white/10 focus:outline-none focus:border-red-500 focus:bg-white/10 transition-all duration-200 placeholder:text-gray-500"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="relative group">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors group-focus-within:text-red-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="w-full bg-white/5 text-white pl-12 pr-12 py-3.5 rounded-xl border border-white/10 focus:outline-none focus:border-red-500 focus:bg-white/10 transition-all duration-200 placeholder:text-gray-500"
                  value={form.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl animate-[shake_0.5s_ease-in-out]">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-200 font-semibold py-3.5 rounded-xl mt-2 shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </div>

          {/* Options */}
          <div className="flex justify-between items-center text-gray-400 text-sm mt-5">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-600 bg-white/5 text-red-600 focus:ring-red-500 focus:ring-offset-0 cursor-pointer"
              />
              <span className="group-hover:text-gray-300 transition-colors">
                Remember me
              </span>
            </label>
            <button
              type="button"
              className="hover:text-white transition-colors hover:underline underline-offset-4"
            >
              Forgot password?
            </button>
          </div>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-black/60 text-gray-400">
                New to Moviehub?
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-3 text-center">
            <Link
              to="/signup"
              className="block w-full py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Create an Account
            </Link>

            <Link
              to="/home"
              className="block text-gray-400 hover:text-white text-sm transition-colors hover:underline underline-offset-4"
            >
              Continue as Guest →
            </Link>
          </div>
        </form>
      </main>

      {/* Help Center Modal */}
      {openHelp && <HelpCenter onClose={() => setOpenHelp(false)} />}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
      `}</style>
    </div>
  );
}
