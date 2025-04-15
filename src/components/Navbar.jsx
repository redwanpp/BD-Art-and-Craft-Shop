import React, { useState } from "react";
import {
  ShoppingCart,
  UserPlus,
  LogIn,
  LogOut,
  Lock,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useUserStore();
  const { cart } = useCartStore();

  const isAdmin = user?.role === "admin";
  const isCustomer = user?.role === "customer";

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 backdrop-filter backdrop-blur-md bg-opacity-35 shadow-lg z-40 border-b border-cyan-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="md:text-2xl text-xl font-bold text-cyan-400 flex items-center space-x-2"
          >
            BD Art & Craft Shop
          </Link>

          {/* Mobile toggle button */}
          <button onClick={toggleMenu} className="md:hidden text-cyan-400">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex flex-wrap items-center gap-4">
            <NavItems
              isCustomer={isCustomer}
              isAdmin={isAdmin}
              user={user}
              logout={logout}
              cart={cart}
            />
          </nav>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <nav className="md:hidden flex flex-col gap-4 mt-4">
            <NavItems
              isCustomer={isCustomer}
              isAdmin={isAdmin}
              user={user}
              logout={logout}
              cart={cart}
              mobile
            />
          </nav>
        )}
      </div>
    </header>
  );
};

const NavItems = ({ isCustomer, isAdmin, user, logout, cart, mobile }) => {
  const itemClass = `text-gray-300 hover:text-cyan-400 transition duration-300 ease-in-out ${
    mobile ? "text-lg" : "md:text-xl"
  }`;

  return (
    <>
      <Link to="/" className={itemClass}>
        Home
      </Link>

      {isCustomer && (
        <Link
          to="/cart"
          className="relative group text-gray-300 hover:text-cyan-400 transition duration-300 ease-in-out"
        >
          <ShoppingCart className="inline-block mr-1" size={20} />
          <span className="hidden sm:inline">Cart</span>
          {cart.length > 0 && (
            <span className="absolute -top-2 -left-2 bg-cyan-500 text-white rounded-full px-2 py-0.5 text-xs">
              {cart.length}
            </span>
          )}
        </Link>
      )}

      {isAdmin && (
        <Link
          to="/secret-dashboard"
          className="bg-cyan-600 hover:bg-cyan-400 text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
        >
          <Lock className="inline-block mr-1" size={18} />
          <span className="hidden sm:inline">Dashboard</span>
        </Link>
      )}

      {user ? (
        <button
          onClick={logout}
          className="bg-gray-700 hover:bg-gray-500 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline ml-2">Log Out</span>
        </button>
      ) : (
        <>
          <Link
            to="/signup"
            className="bg-cyan-600 hover:bg-cyan-400 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
          >
            <UserPlus className="mr-2" size={18} />
            Sign Up
          </Link>
          <Link
            to="/login"
            className="bg-cyan-600 hover:bg-cyan-400 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
          >
            <LogIn className="mr-2" size={18} />
            Log In
          </Link>
        </>
      )}
    </>
  );
};

export default Navbar;
