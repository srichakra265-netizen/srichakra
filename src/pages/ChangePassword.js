"use client";

import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";

export default function ChangePassword() {
  const router = useRouter();
  const brandBlue = "#028bcc";

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  // Password validation rules
  const validatePassword = (password) => {
    const lengthCheck = password.length >= 8;
    const upperCheck = /[A-Z]/.test(password);
    const lowerCheck = /[a-z]/.test(password);
    const numberCheck = /[0-9]/.test(password);

    return lengthCheck && upperCheck && lowerCheck && numberCheck;
  };

  const handleUpdate = () => {
    setMessage("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage("⚠️ Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("❌ New password & confirm password do not match");
      return;
    }

    if (!validatePassword(newPassword)) {
      setMessage(
        "⚠️ Password must contain at least 8 chars, 1 uppercase, 1 lowercase, and 1 number"
      );
      return;
    }

    setMessage("✅ Password updated successfully!");

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 pt-24 px-5 pb-32">
        <div className="flex items-center mb-6">
          <button onClick={() => router.back()}>
            <ChevronLeft size={25} className="scale-150" color={brandBlue} />
          </button>

          <h1 className="text-2xl font-bold ml-2" style={{ color: brandBlue }}>
            Change Password
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 space-y-5">

          {/* Current Password */}
          <div>
            <label className="text-gray-700 font-medium">Current Password</label>
            <input
              type="password"
              className="w-full mt-1 p-3 border rounded-xl focus:ring-2"
              style={{ borderColor: brandBlue }}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>

          {/* New Password */}
          <div>
            <label className="text-gray-700 font-medium">New Password</label>
            <input
              type="password"
              className="w-full mt-1 p-3 border rounded-xl focus:ring-2"
              style={{ borderColor: brandBlue }}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-gray-700 font-medium">Confirm Password</label>
            <input
              type="password"
              className="w-full mt-1 p-3 border rounded-xl focus:ring-2"
              style={{ borderColor: brandBlue }}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Message */}
          {message && (
            <p className="text-center font-medium py-2 text-sm">{message}</p>
          )}

          {/* Button */}
          <button
            onClick={handleUpdate}
            className="w-full py-3 rounded-xl text-white font-semibold mt-2"
            style={{ backgroundColor: brandBlue }}
          >
            Update Password
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
