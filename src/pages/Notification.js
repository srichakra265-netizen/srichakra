"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  ChevronLeft,
  CheckCircle,
  XCircle,
  AlertCircle,
  Package
} from "lucide-react";
import Header from "@/components/Header";

export default function NotificationPage() {
  const router = useRouter();
  const brandBlue = "#028bcc";

  const [openNote, setOpenNote] = useState(null);

  const notifications = [
    {
      id: 1,
      title: "Indent Approved",
      message:
        "Your indent #1245 has been approved by the admin. You can now proceed with the delivery.",
      status: "approved",
      time: "2 hrs ago"
    },
    {
      id: 2,
      title: "Order Placed",
      message:
        "Your order for 25 items has been successfully placed. Track it in your order history.",
      status: "placed",
      time: "5 hrs ago"
    },
    {
      id: 3,
      title: "Indent Pending",
      message:
        "Your indent #1248 is pending for admin approval. It will be reviewed shortly.",
      status: "pending",
      time: "Yesterday"
    },
    {
      id: 4,
      title: "Indent Rejected",
      message:
        "Your indent #1240 was rejected due to incorrect quantities. Please resubmit.",
      status: "rejected",
      time: "2 days ago"
    }
  ];

  const statusStyles = {
    approved: "bg-green-100 text-green-700 border-green-300",
    pending: "bg-blue-100 text-blue-700 border-blue-300",
    rejected: "bg-red-100 text-red-700 border-red-300",
    placed: "bg-orange-100 text-orange-700 border-orange-300"
  };

  const statusIcons = {
    approved: <CheckCircle size={20} className="text-green-600" />,
    pending: <AlertCircle size={20} className="text-blue-600" />,
    rejected: <XCircle size={20} className="text-red-600" />,
    placed: <Package size={20} className="text-orange-600" />
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-24 px-5 pb-10">
        <div className="flex items-center mb-6">
          <button
            onClick={() =>
              openNote ? setOpenNote(null) : router.back()
            }
          >
            <ChevronLeft size={25} className="scale-150" color={brandBlue} />
          </button>

          <h1
            className="text-2xl font-bold ml-2"
            style={{ color: brandBlue }}
          >
            {openNote ? "Message" : "Notification"}
          </h1>
        </div>

       
        {openNote ? (
          <div
            className={`p-5 rounded-xl border shadow-sm ${statusStyles[openNote.status]}`}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold">{openNote.title}</h2>
              {statusIcons[openNote.status]}
            </div>

            <p className="text-sm opacity-70 mb-3">{openNote.time}</p>
            <p className="text-base leading-relaxed">{openNote.message}</p>
          </div>
        ) : (
        
          <div className="space-y-4">
            {notifications.map((note) => (
              <div
                key={note.id}
                onClick={() => setOpenNote(note)}
                className={`p-4 border rounded-xl shadow-sm cursor-pointer hover:shadow-md transition flex items-center justify-between ${statusStyles[note.status]}`}
              >
                <div>
                  <p className="text-base font-semibold">{note.title}</p>
                  <p className="text-sm opacity-70">{note.time}</p>
                </div>

                <div>{statusIcons[note.status]}</div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

