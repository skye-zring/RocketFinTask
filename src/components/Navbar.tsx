import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full fixed bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
      <div className="text-2xl ">
        RocketFin
      </div>
      <div className="flex gap-6 text-lg">
        <Link to="/" className="hover:text-blue-400 transition">Home</Link>
        <Link to="/search" className="hover:text-blue-400 transition">Search</Link>
      </div>
    </nav>
  );
}
