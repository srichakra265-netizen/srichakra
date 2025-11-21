import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronLeft, Mail, Smartphone, Key, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

function ProfilePage() {
  const brandBlue = '#028bcc';
  const router = useRouter();

  const [user, setUser] = useState({
    name: 'Vishnu P',
    email: 'vishnu.p@example.com',
    mobile: '+91 9876543210'
  });

  const getInitials = (name) => {
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  const initials = getInitials(user.name);

  const handleLogout = () => {
    localStorage.removeItem('agentName');
    router.push('/Login');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-1 pt-20 pb-24 px-4">
        <div className="flex items-center mb-6 mt-4">
          <Link href="/Dashboard">
            <ChevronLeft height={32} className="scale-125" color={brandBlue} />
          </Link>
          <h1 className="text-2xl font-bold text-[${brandBlue}] ml-2">Profile</h1>
        </div>

        <div className="flex flex-col items-center mb-8">
          <div
            className="w-26 h-26 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4 shadow-xl"
            style={{
              backgroundColor: brandBlue,
              border: `4px solid ${brandBlue}`
            }}
          >
            {initials}
          </div>

          <h2 className="text-xl font-semibold" style={{ color: brandBlue }}>
            {user.name}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-md divide-y divide-gray-100 overflow-hidden mb-6">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <Smartphone size={24} color={brandBlue} />
              <p className="text-gray-700">{user.mobile}</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <Mail size={24} color={brandBlue} />
              <p className="text-gray-700">{user.email}</p>
            </div>
          </div>

          
          <div
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => router.push("/ChangePassword")}
          >
            <div className="flex items-center space-x-3">
              <Key size={24} color={brandBlue} />
              <p className="text-gray-700 font-medium">Change Password</p>
            </div>
          </div>
        
        </div>
      </main>

      <div className="fixed bottom-20 left-4 w-[calc(100%-2rem)] max-w-md">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full rounded-xl p-4 bg-white text-gray-700 font-medium shadow hover:bg-gray-50 transition-colors"
        >
          <LogOut size={24} color="#028bcc" />
          Logout
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default ProfilePage;




