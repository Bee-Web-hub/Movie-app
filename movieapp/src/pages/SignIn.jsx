import { useState } from "react";
import { Link } from "react-router-dom";
import HelpCenter from "./HelpCenter";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [openHelp, setOpenHelp] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email || !form.password)
      return setError("Please fill in all fields.");
    if (!emailRegex.test(form.email))
      return setError("Please enter a valid email address.");
    if (form.password.length < 6)
      return setError("Password must be at least 6 characters long.");

    alert("Signed in successfully (demo only)");
  };

  return (
    <div className="relative min-h-screen bg-[url('https://images.unsplash.com/photo-1525186402429-b4ff38bedbec?auto=format&fit=crop&w=1800&q=60')] bg-cover bg-center text-white">
      <div className="absolute inset-0 bg-black/70" />

      {/* Navbar */}
      <header className="relative flex justify-between items-center px-8 py-6">
        <div className="flex items-center gap-2">
          <div className="w-24 h-7 bg-red-600 rounded-sm" />
          <span className="font-bold text-2xl tracking-wide">Moviehub</span>
        </div>
        <button
          onClick={() => setOpenHelp(true)}
          className="text-gray-300 text-sm hover:underline"
        >
          Need Help?
        </button>
      </header>

      {/* Center form */}
      <main className="relative flex justify-center items-center px-4 pt-8 pb-16">
        <form
          onSubmit={handleSubmit}
          className="bg-black/75 p-8 rounded-md w-full max-w-md backdrop-blur-md shadow-2xl"
        >
          <h1 className="text-3xl font-bold mb-6">Sign In</h1>

          <div className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full bg-[#333] text-white px-4 py-3 rounded-md focus:outline-none focus:ring-1 focus:ring-red-600"
              value={form.email}
              onChange={handleChange}
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full bg-[#333] text-white px-4 py-3 rounded-md focus:outline-none focus:ring-1 focus:ring-red-600"
                value={form.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {error && <p className="text-red-400 text-sm mt-1">{error}</p>}

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 transition-colors font-semibold py-3 rounded-md mt-2"
            >
              Sign In
            </button>
          </div>

          <div className="flex justify-between items-center text-gray-400 text-sm mt-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-red-600" /> Remember me
            </label>
          </div>

          <p className="text-gray-400 text-sm mt-6">
            New to Moviehub?{" "}
            <Link to="/signup" className="text-white hover:underline font-medium">
              Create an account
            </Link>
            .
          </p>

<p className="text-gray-400 text-sm mt-3">
  Just looking around?{" "}
  <Link
    to="/movies"
    className="text-white hover:underline font-medium"
  >
    Browse as Guest
  </Link>
</p>
        </form>
      </main>

      {/* Help Center Modal */}
      {openHelp && <HelpCenter onClose={() => setOpenHelp(false)} />}
    </div>
  );
}