"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Bell } from 'lucide-react';

const Header = () => {
  const [agentName, setAgentName] = useState(null);
  const [hasNotifications, setHasNotifications] = useState(true); 
  const router = useRouter();

  const brandBlue = '#028bcc';

  useEffect(() => {
    const name = localStorage.getItem('agentName');
    if (!name) {
      router.push('/Login');
    } else {
      setAgentName(name);
    }

  }, [router]);

  if (!agentName) {
    return (
      <header className="fixed top-0 z-50 flex h-20 w-full items-center justify-between border-b border-gray-100 bg-white px-5">
        <div className="h-14 w-auto"></div>
        <div className="h-8 w-8"></div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 z-30 flex h-20 w-full items-center justify-between border-b border-gray-100 bg-white px-5">
       <img
          src="/Milk\logo.png"
          alt="Srichakra Logo"
          className="h-14 w-auto"
          onError={(e) => {
              e.target.onerror = null; 
              e.target.src = 'https://placehold.co/150x56/028bcc/white?text=Srichakra';
            }}
        /> 

      <button
        aria-label="Notifications"
        className="relative p-2 rounded-full hover:bg-blue-50 transition-colors"
        onClick={() => router.push('/Notification')}
      >
        
        <Bell size={40} style={{ color: brandBlue }} />

        {hasNotifications && (
          <span className="absolute top-1 right-1 h-3 w-3 bg-red-600 rounded-full border-2 border-white"></span>
        )}
      </button>
    </header>
  );
};

export default Header;
