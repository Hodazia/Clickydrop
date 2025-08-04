import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkle, Menu, X, User, LogOut, Code, Globe, SunMoon } from "lucide-react";
import { BACKEND_URL } from "@/utils/schema";
import toast,{Toaster} from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const NavBarUser = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logoutclick = async () => {
    setIsMenuOpen(!isMenuOpen);
    const toastId = toast.loading("Logging out from the Dashboard ....");

    try {
        const response = await fetch(`${BACKEND_URL}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!response.ok) {
            // If the response is not OK, we throw an error with the message from the backend
            throw new Error(data.message || 'Logout failed');
        }
        
        // On successful signup, dismiss the loading toast and show a success toast
        toast.success(` You can now logged out .`, {
            id: toastId, // Dismiss the specific loading toast
        });

        // Navigate to the signin page after a short delay
        setTimeout(() => {
            navigate("/");
        }, 1500);

    } catch (error: any) {
        // On error, dismiss the loading toast and show an error toast
        toast.error(error.message ||
             "Network error. Please try again.", {
            id: toastId, // Dismiss the specific loading toast
        });
    }
  }

  return (
    <>
    <Toaster position="top-right"/>
      <nav
        className="fixed top-0 left-0 right-0 z-50 w-full px-6 py-4 
                   bg-white shadow-sm border-b border-gray-100
                   flex justify-between items-center rounded-b-3xl
                   transition-all duration-300 font-sans"
      >
        {/* --- Left Side: Logo --- */}
        <div className="flex items-center gap-2">
          <Sparkle className="text-indigo-500" size={30} />
          <Link to="/" className="text-xl font-bold text-gray-900">
            ClickyDrop
          </Link>
        </div>

        {/* --- Center: Desktop Menu Items (Visible on Larger Screens) --- */}
        <div className="hidden lg:flex  gap-2">
          <Link to="/links" className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
            <Globe size={20} />
            Links
          </Link>
          <Link to="/dashboard/preview" className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
            <Code size={20} />
            Preview
          </Link>
          <Link to="/profiledashboard" 
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
            <User size={20} />
            Profile
          </Link>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-left w-full">
            <SunMoon size={20} />
            Themes
          </button>
          <button onClick={logoutclick}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors text-left w-full">
            <LogOut size={20} />
            Logout
          </button>
        </div>

        {/* --- Right Side: Mobile Hamburger Icon (Visible on Mobile) --- */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="p-2 text-gray-600 hover:text-indigo-600 transition-colors">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      
      <div
        className={`fixed top-0 right-0 z-40 w-64 h-full bg-white shadow-lg 
                    transform transition-transform duration-300 ease-in-out
                    ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} lg:hidden`}
      >
        <div className="flex flex-col p-6 space-y-4">
          <div className="flex justify-end mb-4">
            <button onClick={toggleMenu} className="p-2 text-gray-600 hover:text-indigo-600">
              <X size={28} />
            </button>
          </div>
          

          <Link to="/links" onClick={toggleMenu} className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
            <Globe size={20} />
            Links
          </Link>
          <Link to="/dashboard/preview" onClick={toggleMenu} className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
            <Code size={20} />
            Preview
          </Link>
          <Link to="/profile" onClick={toggleMenu} className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
            <User size={20} />
            Profile
          </Link>
          <button onClick={toggleMenu} className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-left w-full">
            <SunMoon size={20} />
            Themes
          </button>
          <button onClick={logoutclick} className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors text-left w-full">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};
