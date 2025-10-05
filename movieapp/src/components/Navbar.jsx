import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <Link to="/" className="font-bold text-lg">MovieApp</Link>
      <div>
        <Link to="/" className="px-3 hover:underline">Home</Link>
      </div>
    </nav>
  );
}
