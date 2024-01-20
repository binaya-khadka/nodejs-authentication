import { useState } from "react";

export const Nav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <>
      <nav className="bg-gray-800 p-4">
        <div className="container max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-white text-lg font-semibold">
            <a href="/">NOOOOOO</a>
          </div>

          <div className="hidden md:flex space-x-4">
            <a href="/" className="text-white hover:text-gray-300">Home</a>
            <a href="/login" className="text-white hover:text-gray-300">Login</a>
            <a href="/signup" className="text-white hover:text-gray-300">Signup</a>
          </div>

          <div className="md:hidden">
            <button id="mobile-menu-btn" className="text-white focus:outline-none" onClick={toggleMobileMenu}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <div id="mobile-menu" className={mobileMenuOpen ? "md:hidden bg-gray-800 text-center" : "hidden"}>
        <div className="container mx-auto py-2">
          <a href="/" className="block text-white py-2">Home</a>
          <a href="/login" className="block text-white py-2">Login</a>
          <a href="/signup" className="block text-white py-2">Signup</a>
        </div>
      </div>
    </>
  )
}