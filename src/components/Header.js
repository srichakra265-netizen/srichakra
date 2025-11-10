"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  UserCircle,
  ClipboardList,
  Route,
  Truck,
  LogOut,
  Menu,
} from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [agentName, setAgentName] = useState(null);
  const router = useRouter();
  const currentPath = router.pathname;

  const brandBlue = '#028bcc';

  useEffect(() => {
    const name = localStorage.getItem('agentName');
    if (!name) {
      router.push('/Login');
    } else {
      setAgentName(name);
    }
  }, [router]);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('agentName');
    closeMenu();
    router.push('/Login');
  };

  /**
   * Renders a navigation link with correct active/hover styles.
   * Tailwind's JIT compiler can't use dynamic classes like `text-[${brandBlue}]`,
   * so we use inline styles for the exact color.
   */
  const renderLink = (path, text) => {
    const baseClasses = "flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-base";
    const icon = 
      path === '/Indent' ? <ClipboardList size={20} /> :
      path === '/Routes' ? <Route size={20} /> :
      path === '/Vehicles' ? <Truck size={20} /> : null;

    if (currentPath === path) {
      // Active link style
      return (
        <Link href={path} onClick={closeMenu} 
          className={`${baseClasses} bg-blue-50 font-semibold`}
          style={{ color: brandBlue }} // Apply exact color for active link
        >
          {icon}
          {text}
        </Link>
      );
    }
    
    // Inactive link style
    return (
      <Link href={path} onClick={closeMenu} 
        className={`${baseClasses} font-medium text-gray-700 hover:bg-blue-50`}
        // Apply color on hover using JS events
        onMouseEnter={(e) => e.currentTarget.style.color = brandBlue}
        onMouseLeave={(e) => e.currentTarget.style.color = ''}
      >
        {icon}
        {text}
      </Link>
    );
  };

  // Loading skeleton for when agentName is not yet set
  if (!agentName) {
    return (
      // MODIFIED: Changed sticky to fixed
      <header className="fixed top-0 z-50 flex h-20 w-full items-center justify-between border-b border-gray-100 bg-white px-5">
        <div className="h-14 w-auto"></div>
        <div className="h-8 w-8"></div>
      </header>
    );
  }

  return (
    <>
      
      {/* Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={closeMenu}
        />
      )}
      <nav 
        className={`fixed top-0 right-0 z-50 flex h-full w-72 flex-col bg-white shadow-xl transition-transform duration-300 ease-in-out
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        
        {/* All menu content is in one flex column */}
        <div className="flex flex-col gap-y-4 p-4">
          
          {/* -- Profile Section -- */}
          <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-4">
            <UserCircle size={40} style={{ color: brandBlue }} />
            <div>
              <p className="text-base font-semibold text-gray-900">
                {agentName}
              </p>
              <p className="text-sm text-gray-600">Agent</p>
            </div>
          </div>

          {/* -- Navigation Links & Logout -- */}
          <div className="flex flex-col gap-y-1">
            {renderLink("/Indent", "Indent")}
            {renderLink("/Routes", "Routes")}
            {renderLink("/VehVicles", "Vehicles")}

            {/* --- 1. SEPARATOR LINE --- */}
            <hr className="my-2 border-gray-200" />

            {/* --- 2. LOGOUT BUTTON MOVED HERE --- */}
            <button
              onClick={handleLogout}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-base font-medium text-gray-700 transition-all hover:bg-blue-50`}
              onMouseEnter={(e) => e.currentTarget.style.color = brandBlue}
              onMouseLeave={(e) => e.currentTarget.style.color = ''}
            >
              <LogOut size={20} />
              Logout
            </button>
            {/* ---------------------------------- */}
            
          </div>
        </div>

      </nav>

      {/* ----------------- */}
      {/* HEADER / APP BAR   */}
      {/* ----------------- */}
      {/* MODIFIED: Replaced 'sticky' with 'fixed' for reliability */}
      <header className="fixed top-0 z-30 flex h-20 w-full items-center justify-between border-b border-gray-100 bg-white px-5">
        
        {/* 1. Left Side (Logo) */}
        <img
          src="/log.png"
          alt="Srichakra Logo"
          className="h-14 w-auto"
          // ADDED: Fallback image
          onError={(e) => {
              e.target.onerror = null; // prevents loops
              e.target.src = 'https://placehold.co/150x56/028bcc/white?text=Srichakra';
            }}
        />

        {/* 2. Right Side (Menu Button) */}
        <button
          onClick={handleMenuClick}
          aria-label="Open navigation menu"
          className="rounded-lg p-2 transition-colors hover:bg-blue-50"
        >
          <Menu size={28} style={{ color: brandBlue }} />
        </button>
        
      </header>
    </>
  );
};

export default Header;