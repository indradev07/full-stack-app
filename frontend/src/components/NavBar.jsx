import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/shows" className="flex items-center space-x-3">
          <img src="https://static.tvmaze.com/images/tvm-header-logo.png" className="h-8" alt="Logo" />
        </Link>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-gray-500 rounded-lg">
          ☰
        </button>
        <div className={`${isOpen ? "block" : "hidden"} md:flex w-full md:w-auto`}>
          <ul className="flex flex-col md:flex-row md:space-x-8">
            <li><Link to="/shows" className="text-[#3C948B]">Home</Link></li>
            <li><Link to="/favorites" className="text-[#3C948B]">Favorites</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
