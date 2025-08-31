import { useState } from "react";
import { useTheme } from "../context/ThemeProvider";
import { Menu, X, Sun, Moon, LogOut, Settings } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";

export default function Navbar() {
  const { theme, toggleTheme, Auth, setOpenModal } = useTheme();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/Blog" },
  ];

  return (
    <header className="backdrop-blur-lg bg-white/30 dark:bg-slate-900/70 shadow-md sticky top-0 z-50 border-b border-white/20 dark:border-slate-700/40">
      <nav className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <NavLink
            to="/"
            className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent"
          >
            My Portfolio<span className="text-[--color-secondary]">.</span>
          </NavLink>

          {/* Menu desktop */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `relative font-medium tracking-wide transition-colors 
                  hover:text-[--color-secondary]
                  after:content-[''] after:absolute after:w-0 after:h-[2px] 
                  after:bg-[--color-secondary] after:left-0 after:-bottom-1 
                  hover:after:w-full after:transition-all after:duration-500
                  ${
                    isActive
                      ? "text-cyan-500 after:w-full"
                      : "text-gray-700 dark:text-gray-200"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white hover:scale-110 transition shadow-md"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            {Auth && localStorage.Token && (
              <button
                onClick={() => {
                  navigate("/EditProfile");
                }}
                className="p-2 rounded-full bg-gradient-to-r from-slate-500 to-cyan-900 text-white hover:scale-110 transition shadow-md"
              >
                <Settings size={18} />
              </button>
            )}

            {/* Logout button */}
            {Auth && localStorage.Token && (
              <button
                onClick={() => {
                  setOpenModal(true);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full font-medium
                  bg-gradient-to-r from-red-500 to-red-600 text-white
                  hover:from-red-600 hover:to-red-700
                  transition-all duration-300 shadow-md hover:shadow-lg hidden lg:flex"
              >
                <LogOut size={18} />
                Logout
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:scale-110 transition"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-4 space-y-3 bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl shadow-lg rounded-b-xl">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block py-2 font-medium transition-colors
                hover:text-[--color-secondary]
                ${
                  isActive
                    ? "text-cyan-500"
                    : "text-gray-700 dark:text-gray-200"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          {Auth && localStorage.Token && (
            <button
              onClick={() => {
                setOpenModal(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg 
                bg-gradient-to-r from-red-500 to-red-600 text-white
                hover:from-red-600 hover:to-red-700 transition shadow-md"
            >
              <LogOut size={18} /> Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
