import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-4">Create Your Moviehub Account</h1>
      <p className="text-gray-400 mb-8">Sign up to explore thousands of movies and shows.</p>
      <Link
        to="/"
        className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-md font-semibold"
      >
        Back to Sign In
      </Link>
    </div>
  );
}